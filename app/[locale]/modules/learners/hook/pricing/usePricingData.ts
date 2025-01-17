import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Locale } from '@/app/configs/appConfig';

import {
  createAffilateSubscription,
  fetchPackagePlans,
  initiateSubscription,
  fetchSubscription,
} from '@/modules/learners/services/pricing/fetchPricing.service';
import {
  PackagePlan,
  PackageType,
  Subscription,
} from '@/modules/learners/types/pricing/Pricing.types';
import { RootState } from '@/modules/learners/store';
import { getLocalizedAffiliatePlan } from '@/modules/learners/hook/pricing/getLocalizedAffiliatePlan';


interface AffiliateResponse {
  success: boolean;
}

export function usePricingData() {
  const [plans, setPlans] = useState<PackagePlan[]>([]);
  const [currentSubscription, setCurrentSubscription] =
    useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useSelector((state: RootState) => state.locale.currentLocale);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [plansResponse, subscriptionResponse] = await Promise.all([
        fetchPackagePlans(locale),
        fetchSubscription(),
      ]);

      if (
        plansResponse &&
        plansResponse.success &&
        Array.isArray(plansResponse.data)
      ) {
        const hasActiveSubscription =
          subscriptionResponse &&
          subscriptionResponse.success &&
          subscriptionResponse.data &&
          subscriptionResponse.data.status === 'active';

        let allPlans = plansResponse.data;

        if (
          !hasActiveSubscription ||
          (subscriptionResponse?.data?.packagePlan === 'affiliate' &&
            subscriptionResponse?.data?.status === 'active')
        ) {
          allPlans = [...allPlans, getLocalizedAffiliatePlan(locale as Locale)];
        }
        setPlans(allPlans);
      } else {
        setError(plansResponse?.error ?? 'Failed to fetch package plans');
      }

      if (
        subscriptionResponse &&
        subscriptionResponse.success &&
        subscriptionResponse.data
      ) {
        setCurrentSubscription(subscriptionResponse.data);
      }
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscription = async (
    plan: PackageType,
  ): Promise<string | null> => {
    try {
      const response = await initiateSubscription(plan);

      if (response && response.success && response.checkoutUrl) {
        return response.checkoutUrl;
      } else {
        setError(response?.error ?? 'Failed to initiate subscription');
        return null;
      }
    } catch (err) {
      setError('An error occurred while initiating subscription');
      return null;
    }
  };

  const handleAffiliateSubscription = async (): Promise<boolean> => {
    try {
      const response =
        (await createAffilateSubscription()) as AffiliateResponse;

      if (response && response.success) {
        const updatedSubscriptionResponse = await fetchSubscription();
        if (
          updatedSubscriptionResponse &&
          updatedSubscriptionResponse.success &&
          updatedSubscriptionResponse.data
        ) {
          setCurrentSubscription(updatedSubscriptionResponse.data);
        }
        return true;
      } else {
        setError('Failed to create affiliate subscription');
        return false;
      }
    } catch (err) {
      setError('An error occurred while creating affiliate subscription');
      return false;
    }
  };

  return {
    plans,
    currentSubscription,
    loading,
    error,
    handleSubscription,
    handleAffiliateSubscription,
  };
}
