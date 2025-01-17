import { apiService } from '@/shared/services/httpClient.service';

import { LEARNER_API_ROUTES } from '@/modules/learners/utils';
import { IPopularAudiosResponse } from '@/modules/learners/types/PopularAudio.types';
import ErrorConstants from '@/modules/learners/constants/ErrorConstants';

const getPopularAudio = async (): Promise<IPopularAudiosResponse> => {
  const apiUrl = `${LEARNER_API_ROUTES.GET_POPULAR_AUDIOS}?page=1&limit=10&sortBy=views`;

  // Call API using axios
  const response = await apiService.get<IPopularAudiosResponse>(apiUrl);
  if (response.data === null) {
    return {
      code: response.code,
      data: null,
      error: ErrorConstants.ErrClientPageNotFound,
      success: false,
    };
  }
  // Return data if API call is successful
  return response.data;
};
export const popularAudiosService = {
  getPopularAudio,
};
