import { apiService } from '@/shared/services/httpClient.service';

import { IGetVideoLearnersResponse } from '@/modules/learners/types/VideoLearner.types';
import ErrorConstants from '@/modules/learners/constants/ErrorConstants';
import { LEARNER_API_ROUTES } from '@/modules/learners/utils';

const getVideoLearners = async (): Promise<IGetVideoLearnersResponse> => {
  const apiUrl = `${LEARNER_API_ROUTES.GET_VIDEO_LEARNERS}?page=1&limit=10&sortBy=views`;

  // Call API using axios
  const response = await apiService.get<IGetVideoLearnersResponse>(apiUrl);
  // Return data if API call is successful
  return (
    response.data ?? {
      code: response.code,
      data: null,
      error: ErrorConstants.ErrClientPageNotFound,
      success: false,
    }
  );
};

export const videoLearnersService = {
  getVideoLearners,
};
