import { apiClient } from '@/app/[locale]/shared/api';
import type { ApiResponse2 } from '@/app/[locale]/shared/types/ApiResponse.types';

import {
  PackagePlan,
  PackageType,
  Subscription,
  InitiateSubscriptionResponse,
} from '@/modules/learners/types/pricing/Pricing.types';
import { LEARNER_APP_ROUTES } from '@/modules/learners/utils/api-app-routes';

export const fetchPackagePlans = async (
  locale: string,
): Promise<ApiResponse2<PackagePlan[]>> => {
  try {
    const response: ApiResponse2<PackagePlan[]> = await apiClient.get(
      `${LEARNER_APP_ROUTES.PRICING}?locale=${locale}`,
    );
    return response;
  } catch (error) {
    return {
      code: 500,
      data: null,
      success: false,
      error: 'Failed to fetch package plans',
    };
  }
};

export const initiateSubscription = async (
  plan: PackageType,
): Promise<InitiateSubscriptionResponse> => {
  try {
    const response: InitiateSubscriptionResponse = await apiClient.post(
      LEARNER_APP_ROUTES.INITIATE_SUBSCRIPTION,
      { plan },
    );

    return response;
  } catch (error) {
    return {
      code: 500,
      data: null,
      success: false,
      error: 'Failed to initiate subscription',
      checkoutUrl: '',
    };
  }
};

export const createAffilateSubscription = async (): Promise<
  ApiResponse2<{
    success: boolean;
  }>
> => {
  try {
    const response: ApiResponse2<{ success: boolean }> = await apiClient.post(
      LEARNER_APP_ROUTES.AFFILIATE,
    );
    return response;
  } catch (error) {
    return {
      code: 500,
      data: null,
      success: false,
      error: 'Failed to create affiliate subscription',
    };
  }
};

export const fetchSubscription = async (): Promise<
  ApiResponse2<Subscription>
> => {
  try {
    const response: ApiResponse2<Subscription> = await apiClient.get(
      LEARNER_APP_ROUTES.SUBSCRIPTION,
    );
    return response;
  } catch (error) {
    return {
      code: 500,
      data: null,
      success: false,
      error: 'Failed to fetch subscription',
    };
  }
};
