import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { apiClient } from '@/shared/api';

import { videosHistoryLocalService } from '@/modules/learners/services/landing/VideosHistoryLocal.service';
import {
  IGetVideoContinueResponse,
  IVideoActivity,
} from '@/modules/learners/types/VideoContinue.types';
import { setError } from '@/modules/learners/store/slice';
import ErrorConstants from '@/modules/learners/constants/ErrorConstants';
import { setVideosContinueList } from '@/modules/learners/store/slice/videoContinueSlice';

export const useSendVideoHistory = (
  isTabActive: boolean,
  accessToken: string | undefined,
  delay = 60000,
) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();

  const sendDataToServer = async (videosHistory: IVideoActivity[]) => {
    if (!accessToken || !videosHistory.length) return;
    const jsonListHistory = videosHistory.map(
      ({ video, progressAtSeconds, actionAt }) => ({
        mediaUrl: video.youtubeUrl,
        progressAtSeconds,
        actionAt,
      }),
    );

    try {
      const { code, data, error }: IGetVideoContinueResponse =
        await apiClient.post('/videos/videos-continue', {
          activities: jsonListHistory,
        });
      if (code === 200 && data?.list && data?.list?.length > 0) {
        dispatch(setVideosContinueList(data));
        videosHistoryLocalService.removeHistory();
      } else
        dispatch(setError(error || ErrorConstants.ErrAdminAccountNotFound));
    } catch (err) {
      const errMsg = axios.isAxiosError(err)
        ? err.response?.data?.error?.toString()
        : ErrorConstants.ErrAdminAccountNotFound;
      dispatch(setError(errMsg));
    }
  };

  const manageTimer = (isActive: boolean) => {
    if (isActive && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const history = videosHistoryLocalService.getHistory();
        if (history?.data?.list) sendDataToServer(history.data.list);
      }, delay);
    } else {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    manageTimer(isTabActive);

    return () => {
      // Call clearInterval when component unmounts
      clearInterval(intervalRef.current as NodeJS.Timeout);
      intervalRef.current = null;
    };
  }, [isTabActive, delay, accessToken]);
};
