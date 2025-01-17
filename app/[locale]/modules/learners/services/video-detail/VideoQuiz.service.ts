import { AxiosHeaders } from 'axios';

import { apiService } from '@/shared/services/httpClient.service';

import { IGetVideoQuizResponse } from '@/modules/learners/types/video-detail';
import { LEARNER_API_ROUTES } from '@/modules/learners/utils';

const getVideoEasyQuizs = async (
  mediaUrl: string,
): Promise<IGetVideoQuizResponse> => {
  const params = new URLSearchParams();
  mediaUrl && params.append('mediaUrl', mediaUrl);
  params.append('quizType', 'QUIZ_PRACTICE_EASY');
  const apiUrl = `${LEARNER_API_ROUTES.GET_VIDEO_QUIZ}?${params.toString()}`;

  // Call API using axios
  const response = await apiService.get<IGetVideoQuizResponse>(apiUrl, {
    requireAuth: true,
    headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
  });
  // Return data if API call is successful
  return (
    response.data ?? {
      code: response.code,
      success: false,
      error: response.error,
      data: null,
    }
  );
};

const getVideoMediumQuizs = async (
  mediaUrl: string,
): Promise<IGetVideoQuizResponse> => {
  const params = new URLSearchParams();
  mediaUrl && params.append('mediaUrl', mediaUrl);
  params.append('quizType', 'QUIZ_PRACTICE_MEDIUM');
  const apiUrl = `${LEARNER_API_ROUTES.GET_VIDEO_QUIZ}?${params.toString()}`;

  // Call API using axios
  const response = await apiService.get<IGetVideoQuizResponse>(apiUrl, {
    requireAuth: true,
    headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
  });
  // Return data if API call is successful
  return (
    response.data ?? {
      code: response.code,
      success: false,
      error: response.error,
      data: null,
    }
  );
};

export const videoQuizService = {
  getVideoEasyQuizs,
  getVideoMediumQuizs,
};
