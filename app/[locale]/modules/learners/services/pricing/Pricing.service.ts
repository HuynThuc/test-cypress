/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import axios, { AxiosError, AxiosHeaders } from 'axios';

import type { ApiResponse2 } from '@/app/[locale]/shared/types/ApiResponse.types';
import { apiService } from '@/app/[locale]/shared/services/httpClient.service';

import {
  IGetPackagePlansResponse,
  InitiateSubscriptionResponse,
  PackagePlan,
  Subscription,
} from '@/modules/learners/types/pricing/Pricing.types';
import ErrorConstants, {
  ErrorKeys,
} from '@/modules/learners/constants/ErrorConstants';
import { validateErrorCode } from '@/modules/learners/utils/validateErrrorCode.utils';
import { LEARNER_API_ROUTES } from '@/modules/learners/utils';

export const fetchServerAllPackagePlans = async (
  locale?: string,
): Promise<IGetPackagePlansResponse> => {
  try {
    const params = new URLSearchParams();
    if (locale) params.append('locale', locale);

    const response = await apiService.get<PackagePlan[]>(
      LEARNER_API_ROUTES.GET_PACKAGE_PLANS +
        (params.toString() ? `?${params.toString()}` : ''),
      {
        requireAuth: false,
        headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
      },
    );
    return response;
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

export const initiateServerSubscription = async (
  plan: string,
): Promise<ApiResponse2<InitiateSubscriptionResponse>> => {
  try {
    const response = await apiService.post<InitiateSubscriptionResponse>(
      LEARNER_API_ROUTES.INITIATE_SUBSCRIPTION,
      { plan },
      {
        requireAuth: true,
        headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
      },
    );

    return response;
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

export const fetchServerSubscription = async (): Promise<
  ApiResponse2<Subscription>
> => {
  try {
    const response = await apiService.get<Subscription>(
      LEARNER_API_ROUTES.GET_SUBSCRIPTION,
      {
        requireAuth: true,
        headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
      },
    );

    return response;
  } catch (error) {
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

export const createServerAffiliateSubscription = async (): Promise<
  ApiResponse2<unknown>
> => {
  try {
    const response = await apiService.post(
      LEARNER_API_ROUTES.CREATE_AFFILIATE_SUBSCRIPTION,
      {},
      {
        requireAuth: true,
        headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
      },
    );
    return response;
  } catch (error) {
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
