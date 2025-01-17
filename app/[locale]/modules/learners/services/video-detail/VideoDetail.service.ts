import axios from 'axios';

import { apiService } from '@/shared/services/httpClient.service';

import ErrorConstants from '@/modules/learners/constants/ErrorConstants';
import { IGetSubtitlesOfVideoDetailResponse } from '@/modules/learners/types/video-detail/VideoDetail.types';
import { validateErrorCode } from '@/modules/learners/utils/validateErrrorCode.utils';

const PROXY_BACKEND = process.env.PROXY_BACKEND || 'http://localhost:3000';

export async function fetchWithErrorHandling<T>(url: string): Promise<T> {
  try {
    const fullUrl = `${PROXY_BACKEND}${url}`;
    const response = await axios.get<T>(fullUrl);
    return response.data;
  } catch (error) {
    const defaultErrorCode = ErrorConstants.ErrSomethingWentWrong;
    const defaultStatusCode = 500;

    const errorCode =
      axios.isAxiosError(error) && error.response
        ? validateErrorCode(error.response.data.error || defaultErrorCode)
        : ErrorConstants.ErrClientNoInternet;

    const statusCode =
      axios.isAxiosError(error) && error.response
        ? error.response.status
        : defaultStatusCode;

    return {
      code: statusCode,
      success: false,
      error: errorCode,
      data: null,
    } as T;
  }
}

export async function getAllSubtitleOfVideoDetail(
  mediaUrl: string,
  p: string,
): Promise<IGetSubtitlesOfVideoDetailResponse> {
  const apiUrl = `/youtube-subtitles${p == 'pro' ? '-ai' : ''}/get-all-by-media-url?mediaUrl=https://www.youtube.com/watch?v=${mediaUrl}`;
  const response =
    await apiService.get<IGetSubtitlesOfVideoDetailResponse>(apiUrl);
  return (
    response.data ?? {
      code: 500,
      success: false,
      error: ErrorConstants.ErrSomethingWentWrong,
      data: null,
    }
  );
}
