import { apiClient } from '@/shared/api';

import { videosHistoryLocalService } from '@/modules/learners/services/landing/VideosHistoryLocal.service';
import {
  IGetVideoContinueResponse,
  IListVideoContinue,
} from '@/modules/learners/types/VideoContinue.types';
import { AuthorizationInfo } from '@/modules/helenngolang/types';

export const fetchContinueWatchingData = async (
  authSession: AuthorizationInfo,
): Promise<IListVideoContinue | null> => {
  if (!authSession) return null;

  const localHistory = videosHistoryLocalService.getHistory();

  try {
    const response: IGetVideoContinueResponse = localHistory
      ? await apiClient.post('/videos/videos-continue', {
          activities: localHistory.data?.list.map(
            ({ video, progressAtSeconds, actionAt }) => ({
              mediaUrl: video.youtubeUrl,
              progressAtSeconds,
              actionAt,
            }),
          ),
        })
      : await apiClient.get('/videos/videos-continue');
    return response.data ?? { userId: '', list: [] };
  } catch {
    return null;
  }
};
