import { AxiosHeaders } from 'axios';

import { apiService } from '@/shared/services/httpClient.service';

import ErrorConstants from '@/modules/learners/constants/ErrorConstants';
import { LEARNER_API_ROUTES } from '@/modules/learners/utils';
import {
  IActivities,
  IGetVideoContinueResponse,
} from '@/modules/learners/types/VideoContinue.types';

const getVideoContinue = async (): Promise<IGetVideoContinueResponse> => {
  const apiUrl = LEARNER_API_ROUTES.GET_VIDEO_LERNERS_CONTINUE;
  // Call API using axios
  const response = await apiService.get<IGetVideoContinueResponse>(apiUrl, {
    requireAuth: true,
    headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
  });
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

const postVideoContinue = async (body: {
  activities: IActivities[];
}): Promise<IGetVideoContinueResponse> => {
  const apiUrl = LEARNER_API_ROUTES.GET_VIDEO_LERNERS_CONTINUE;

  // Call API using axios
  const response = await apiService.post<IGetVideoContinueResponse>(
    apiUrl,
    body,
    {
      requireAuth: true,
      headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
    },
  );

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
export const videoContinueService = {
  getVideoContinue,
  postVideoContinue,
};
