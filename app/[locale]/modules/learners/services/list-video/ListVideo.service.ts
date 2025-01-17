import { apiService } from '@/shared/services/httpClient.service';

import ErrorConstants from '@/modules/learners/constants/ErrorConstants';
import { LEARNER_API_ROUTES } from '@/modules/learners/utils';
import {
  IGetCategoriesResponse,
  IGetCategoryListResponse,
  IGetChannelVideoListResponse,
} from '@/modules/learners/types/VideoChannels.types';

const getChannelVideos = async ({
  page = 1,
  size = 10,
  channel,
}: {
  page: number;
  size?: number;
  channel: string;
}): Promise<IGetCategoryListResponse> => {
  const apiUrl = `${LEARNER_API_ROUTES.GET_VIDEO_LEARNERS}?page=${page}&limit=${size || 10}&channel=${channel}`;
  const response = await apiService.get<IGetCategoryListResponse>(apiUrl);

  return (
    response.data ?? {
      code: response.code,
      data: null,
      error: ErrorConstants.ErrClientPageNotFound,
      success: false,
    }
  );
};

const getChannels = async ({
  page = 1,
}: {
  page: number;
}): Promise<IGetChannelVideoListResponse> => {
  const apiUrl = `${LEARNER_API_ROUTES.GET_VIDEO_CHANNELS}?page=${page}`;
  const response = await apiService.get<IGetChannelVideoListResponse>(apiUrl);

  return (
    response.data ?? {
      code: response.code,
      data: null,
      error: ErrorConstants.ErrClientPageNotFound,
      success: false,
    }
  );
};

const getCategoryVideos = async ({
  page = 1,
  size = 10,
  category,
  sortBy,
}: {
  page: number;
  size?: number;
  category: string;
  sortBy?: string;
}): Promise<IGetCategoryListResponse> => {
  const sortByParam = sortBy ? `&sortBy=${sortBy}` : '';
  const apiUrl = `${LEARNER_API_ROUTES.GET_VIDEO_LEARNERS}?page=${page}&limit=${size || 10}&category=${category}${sortByParam}`;

  const response = await apiService.get<IGetCategoryListResponse>(apiUrl);

  return (
    response.data ?? {
      code: response.code,
      data: null,
      error: ErrorConstants.ErrClientPageNotFound,
      success: false,
    }
  );
};

const getCategories = async (): Promise<IGetCategoriesResponse> => {
  const apiUrl = `${LEARNER_API_ROUTES.GET_VIDEO_CATEGORIES}`;
  const response = await apiService.get<IGetCategoriesResponse>(apiUrl);

  return (
    response.data ?? {
      code: response.code,
      data: null,
      error: ErrorConstants.ErrClientPageNotFound,
      success: false,
    }
  );
};

export const listVideoService = {
  getChannelVideos,
  getChannels,
  getCategoryVideos,
  getCategories,
};
