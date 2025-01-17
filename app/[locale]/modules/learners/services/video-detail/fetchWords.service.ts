import { apiClient } from '@/shared/api';

import { LEARNER_APP_ROUTES } from '@/modules/learners/utils/api-app-routes';
import {
  IGetVideoWordsResponse,
  WordProficiencyPayload,
} from '@/modules/learners/types/video-detail/VideoDetail.types';

export const fetchWords = async (
  mediaUrl: string,
  practice: boolean = false,
  isPublic: boolean = false,
): Promise<IGetVideoWordsResponse | null> => {
  try {
    const params = new URLSearchParams({
      mediaUrl,
      practice: practice.toString(),
      isPublic: isPublic.toString(),
    });

    const response: IGetVideoWordsResponse = await apiClient.get(
      `${LEARNER_APP_ROUTES.VIDEO_DETAIL}?${params.toString()}`,
    );
    return response;
  } catch (error) {
    return null;
  }
};
export const updateWordProficiency = async (
  payload: WordProficiencyPayload,
): Promise<boolean> => {
  try {
    await apiClient.put(LEARNER_APP_ROUTES.VIDEO_DETAIL, payload);
    return true;
  } catch (error) {
    return false;
  }
};
