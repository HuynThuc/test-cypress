'use client';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Section from '@/modules/learners/components/landing-page/homepage/widgets/SectionItemCustom';
import { CardVideoItem } from '@/modules/learners/components/landing-page/homepage/widgets/CardVideoItem';
import { setError } from '@/modules/learners/store/slice/errorSlice';
import { useTabVisibility } from '@/modules/learners/utils/useTabVisibility';
import { AuthorizationInfo } from '@/modules/helenngolang/types';
import { useSendVideoHistory } from '@/modules/learners/utils/useSendVideoHistory';
import { RootState } from '@/modules/learners/store';
import { fetchContinueWatchingData } from '@/app/[locale]/modules/learners/services/landing/fetchContinueWatching.service';
import { setVideosContinueList } from '@/modules/learners/store/slice/videoContinueSlice';
import { videosHistoryLocalService } from '@/app/[locale]/modules/learners/services/landing/VideosHistoryLocal.service';

export default function ContinueVideo() {
  const [error, setErrors] = useState<string | null>(null);
  const t = useTranslations('Home');
  const dispatch = useDispatch();
  const router = useRouter();
  const videosContinueList = useSelector(
    (state: RootState) => state.videoContinue.list,
  );
  const clientSession = useSelector((state: RootState) => state.session);

  useEffect(() => {
    if (!clientSession.data || !clientSession.data?.authorization) return;

    const fetchData = async () => {
      const data = await fetchContinueWatchingData(
        clientSession.data?.authorization as AuthorizationInfo,
      );
      if (data) {
        dispatch(setVideosContinueList(data));
        videosHistoryLocalService.removeHistory();
      }
      data
        ? dispatch(setVideosContinueList(data))
        : setErrors('Failed to fetch continue watching data');
    };

    fetchData();
  }, [clientSession]);

  const isTabActive = useTabVisibility();
  const accessToken = clientSession.data?.authorization?.accessToken;
  useSendVideoHistory(isTabActive, accessToken);

  useEffect(() => {
    if (error) {
      dispatch(setError(error));
    }
  }, [error, dispatch, router]);

  if (
    error ||
    !clientSession.data ||
    !videosContinueList ||
    videosContinueList?.length <= 0
  )
    return null;

  return (
    <div className="max-h-[260px] min-h-[259px]">
      <Section
        label={t('continueWatching')}
        listCard={videosContinueList.map(({ video }) => video)}
        renderItem={(video, index) => (
          <CardVideoItem key={index} video={video} className="w-[240px]" />
        )}
      />
    </div>
  );
}
