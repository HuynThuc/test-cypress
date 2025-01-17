import { AxiosHeaders } from 'axios';

import { apiService } from '@/shared/services/httpClient.service';

import ErrorConstants from '@/modules/learners/constants/ErrorConstants';
import { LEARNER_API_ROUTES } from '@/modules/learners/utils';
import { IGetStreakResponse } from '@/modules/learners/types';

const getStreakUser = async (): Promise<IGetStreakResponse> => {
  const apiUrl = LEARNER_API_ROUTES.GET_STREAK;

  // Call API using axios
  const response = await apiService.get<IGetStreakResponse>(apiUrl, {
    requireAuth: true,
    headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
  });
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

export const streakService = {
  getStreakUser,
};
