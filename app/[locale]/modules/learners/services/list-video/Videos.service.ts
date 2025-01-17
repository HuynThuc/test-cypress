import axios from 'axios';

import { apiService } from '@/app/[locale]/shared/services/httpClient.service';

import {
  IGetCategoriesResponse,
  IGetCategoryListResponse,
  IGetChannelListResponse,
  IGetChannelVideoListResponse,
  IGetTopChannelResponse,
  IGetTrendingVideosResponse,
} from '@/modules/learners/types';
import { LEARNER_API_ROUTES } from '@/modules/learners/utils';
import ErrorConstants, {
  ErrorKeys,
} from '@/modules/learners/constants/ErrorConstants';
import { validateErrorCode } from '@/modules/learners/utils/validateErrrorCode.utils';

export async function getInitialCategories(): Promise<IGetCategoriesResponse> {
  try {
    const apiUrl = LEARNER_API_ROUTES.GET_VIDEO_CATEGORIES;
    const response = await apiService.get<IGetCategoriesResponse>(apiUrl);
    return (
      response.data || {
        code: response.code,
        data: null,
        error: ErrorConstants.ErrClientPageNotFound,
        success: false,
      }
    );
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function getInitialHomePageVideos(): Promise<IGetChannelVideoListResponse> {
  try {
    const apiUrl = `${LEARNER_API_ROUTES.GET_VIDEO_CHANNELS}?page=1`;
    const response = await apiService.get<IGetChannelVideoListResponse>(apiUrl);
    return (
      response.data || {
        code: response.code,
        data: null,
        error: ErrorConstants.ErrClientPageNotFound,
        success: false,
      }
    );
  } catch (error: unknown) {
    return handleError(error);
  }
}
export async function getInitialHomePageTrendingVideos(): Promise<IGetTrendingVideosResponse> {
  try {
    const apiUrl = `${LEARNER_API_ROUTES.GET_VIDEO_TRENDING}?limit=5`;
    const response = await apiService.get<IGetTrendingVideosResponse>(apiUrl);
    return (
      response.data || {
        code: response.code,
        data: [],
        error: ErrorConstants.ErrClientPageNotFound,
        success: false,
      }
    );
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function getInitialHomePageTopChannels(): Promise<IGetTopChannelResponse> {
  try {
    const apiUrl = LEARNER_API_ROUTES.GET_TOP_CHANNEL;
    const response = await apiService.get<IGetTopChannelResponse>(apiUrl);
    return (
      response.data || {
        code: response.code,
        data: [],
        error: ErrorConstants.ErrClientPageNotFound,
        success: false,
      }
    );
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function getInitalCategoryVideos({
  category,
  sortBy,
}: {
  category: string;
  sortBy?: string;
}): Promise<IGetCategoryListResponse> {
  try {
    const sortByParam = sortBy ? `&sortBy=${sortBy}` : '';
    const apiUrl = `${LEARNER_API_ROUTES.GET_VIDEO_LEARNERS}?page=1&limit=10&category=${category}${sortByParam}`;
    const response = await apiService.get<IGetCategoryListResponse>(apiUrl);
    return (
      response.data || {
        code: response.code,
        data: null,
        error: ErrorConstants.ErrClientPageNotFound,
        success: false,
      }
    );
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function getInitalChannelVideos({
  channel,
}: {
  channel: string;
}): Promise<IGetChannelListResponse> {
  try {
    const apiUrl = `${LEARNER_API_ROUTES.GET_VIDEO_LEARNERS}?page=1&limit=10&channel=${channel}`;
    const response = await apiService.get<IGetChannelListResponse>(apiUrl);
    return (
      response.data || {
        code: response.code,
        data: null,
        error: ErrorConstants.ErrClientPageNotFound,
        success: false,
      }
    );
  } catch (error: unknown) {
    return handleError(error);
  }
}

function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const errorCode: ErrorKeys = validateErrorCode(
        error.response.data.error || ErrorConstants.ErrSomethingWentWrong,
      );
      return {
        code: error.response.status || 500,
        success: false,
        error: errorCode,
        data: null,
      };
    }
  }

  return {
    code: 500,
    success: false,
    error:
      error instanceof Error
        ? error.message
        : ErrorConstants.ErrClientNoInternet,
    data: null,
  };
}
