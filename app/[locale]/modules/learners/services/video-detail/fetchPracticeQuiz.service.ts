import { apiClient } from '@/shared/api';

import type { IGetVideoQuizResponse } from '@/modules/learners/types/video-detail/VideoDetail.types';
import { LEARNER_APP_ROUTES } from '@/modules/learners/utils/api-app-routes';
import { LoginResponse } from '@/modules/helenngolang/types';

export const fetchEasyQuizs = async (
  mediaUrl: string,
): Promise<IGetVideoQuizResponse> => {
  try {
    const params = new URLSearchParams({
      mediaUrl,
    });

    const response: IGetVideoQuizResponse = await apiClient.get(
      `${LEARNER_APP_ROUTES.VIDEO_DETAIL_EASY_QUIZ}?${params.toString()}`,
    );
    return response;
  } catch (error) {
    return {
      code: 500,
      data: [],
      error: 'Error fetching easy quiz',
    };
  }
};

export const fetchMediumQuizs = async (
  mediaUrl: string,
): Promise<IGetVideoQuizResponse> => {
  try {
    const params = new URLSearchParams({
      mediaUrl,
    });

    const response: IGetVideoQuizResponse = await apiClient.get(
      `${LEARNER_APP_ROUTES.VIDEO_DETAIL_MEDIUM_QUIZ}?${params.toString()}`,
    );
    return response;
  } catch (error) {
    return {
      code: 500,
      data: [],
      error: 'Error fetching medium quiz',
    };
  }
};

export const fetchPracticeQuiz = async (
  mediaUrl: string,
  session: LoginResponse | null,
) => {
  const promises: Promise<IGetVideoQuizResponse>[] = [];

  // Add API calls that do not require session
  if (session) {
    promises.push(fetchEasyQuizs(mediaUrl));
    promises.push(fetchMediumQuizs(mediaUrl));
  }
  return await Promise.allSettled(promises);
};
