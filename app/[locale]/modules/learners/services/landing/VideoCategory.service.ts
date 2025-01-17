import { apiService } from '@/shared/services/httpClient.service';

import ErrorConstants from '@/modules/learners/constants/ErrorConstants';
import { IGetVideoCategoriesResponse } from '@/modules/learners/types';
import { LEARNER_API_ROUTES } from '@/modules/learners/utils';

async function getAllVideoCategories(): Promise<IGetVideoCategoriesResponse> {
  const response = await apiService.get<IGetVideoCategoriesResponse>(
    LEARNER_API_ROUTES.GET_VIDEO_CATEGORIES,
  );
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
}

export const videoCategoryService = {
  getAllVideoCategories,
};
