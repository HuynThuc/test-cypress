import { apiService } from '@/shared/services/httpClient.service';

import { IGetVideoLearnersResponse } from '@/modules/learners/types/VideoLearner.types';
import ErrorConstants from '@/modules/learners/constants/ErrorConstants';
import { LEARNER_API_ROUTES } from '@/modules/learners/utils';

const getVideoRecommentLearners =
  async (): Promise<IGetVideoLearnersResponse> => {
    const apiUrl = `${LEARNER_API_ROUTES.GET_VIDEO_RECOMMENT_LEARNERS}?limit=10`;

    // Call API using axios
    const response = await apiService.get<IGetVideoLearnersResponse>(apiUrl);
    // Return data if API call is successful
    return (
      response.data ?? {
        code: 500,
        success: false,
        error: ErrorConstants.ErrSomethingWentWrong,
        data: null,
      }
    );
  };

export const videoRecommentLearnersService = {
  getVideoRecommentLearners,
};
