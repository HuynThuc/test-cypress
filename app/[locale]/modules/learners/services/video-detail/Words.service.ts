/* eslint-disable no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError, AxiosHeaders } from 'axios';

import { apiService } from '@/shared/services/httpClient.service';

import type {
  IGetTranslateResponse,
  IGetVideoWordsResponse,
} from '@/modules/learners/types/video-detail/VideoDetail.types';
import { ErrorKeys } from '@/modules/learners/constants';
import { validateErrorCode } from '@/modules/learners/utils/validateErrrorCode.utils';
import ErrorConstants from '@/modules/learners/constants/ErrorConstants';
import { LEARNER_API_ROUTES } from '@/modules/learners/utils';

interface WordProficiencyPayload {
  wordAndProficency: Array<{
    word: string;
    proficiencyLevel: number;
  }>;
}

const fetchServerWords = async (
  mediaUrl: string,
  practice: boolean = false,
): Promise<IGetVideoWordsResponse> => {
  try {
    const params = new URLSearchParams();
    if (mediaUrl) params.append('mediaUrl', mediaUrl);
    if (practice !== undefined) params.append('practice', practice.toString());
    const response = await apiService.get<IGetVideoWordsResponse>(
      `${LEARNER_API_ROUTES.GET_LIST_VIDEO_WORDS}` + '?' + params.toString(),
    );

    return (
      response.data || {
        code: response.code,
        data: null,
        error: ErrorConstants.ErrClientPageNotFound,
        success: false,
      }
    );
  } catch (error: AxiosError | unknown) {
    if (axios.isAxiosError(error)) {
      // Check if the error is from the response (i.e., API returned an error)
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
};

const updateServerWordProficiency = async (
  payload: WordProficiencyPayload,
): Promise<boolean> => {
  try {
    await apiService.put(
      LEARNER_API_ROUTES.PUT_WORD_PROFICIENCY_LEVEL,
      payload,
      {
        requireAuth: true,
        headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
      },
    );
    return true;
  } catch (error) {
    return false;
  }
};

const getTranslatedWords = async (
  youtubeSubtitleId: string,
  languageCode: string,
): Promise<IGetTranslateResponse> => {
  try {
    const response = await apiService.get<IGetTranslateResponse>(
      `${LEARNER_API_ROUTES.GET_TRANSLATED_WORDS}?youtubeSubtitleId=${youtubeSubtitleId}&languageCode=${languageCode}`,
      {
        requireAuth: true,
        headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
      },
    );
    return (
      response.data ?? {
        code: response.code,
        success: false,
        data: null,
        error: response.error ?? ErrorConstants.ErrClientPageNotFound,
      }
    );
  } catch (error) {
    return {
      code: 500,
      success: false,
      error: ErrorConstants.ErrClientNoInternet,
      data: null,
    };
  }
};

export const wordService = {
  fetchServerWords,
  updateServerWordProficiency,
  getTranslatedWords,
};
