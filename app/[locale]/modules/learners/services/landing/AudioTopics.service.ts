import { apiService } from '@/shared/services/httpClient.service';

import { LEARNER_API_ROUTES } from '@/modules/learners/utils';
import { IAudioTopicsResponse } from '@/modules/learners/types/AudioTopics.types';
import ErrorConstants from '@/modules/learners/constants/ErrorConstants';

const getAudioTopics = async (): Promise<IAudioTopicsResponse> => {
  const response = await apiService.get<IAudioTopicsResponse>(
    LEARNER_API_ROUTES.GET_ALLAUDIO_TOPICS,
  );
  if (response.data === null) {
    return {
      code: response.code,
      data: null,
      error: ErrorConstants.ErrClientPageNotFound,
      success: false,
    };
  }
  return response.data;
};
export const audioTopicsService = {
  getAudioTopics,
};
