'use client';
import { useTranslations } from 'next-intl';

import {
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/components/shacdn-ui/Card';

import { PackagePlan } from '@/modules/learners/types/pricing/Pricing.types';

interface PricingCardHeaderProps {
  plan: PackagePlan;
  isCurrentPlan: boolean;
  getSubscriptionEndDate: () => string | null;
}

export const PricingCardHeader = ({
  plan,
  isCurrentPlan,
  getSubscriptionEndDate,
}: PricingCardHeaderProps) => {
  const t = useTranslations('Pricing');

  return (
    <CardHeader>
      <CardTitle className="text-2xl font-bold">
        {plan.name}
        {isCurrentPlan && (
          <span className="ml-2 text-sm text-text-prima">
            ({t('currentplan')})
          </span>
        )}
      </CardTitle>
      <CardDescription className="text-text-secondary">
        {plan.description}
      </CardDescription>
      {isCurrentPlan && getSubscriptionEndDate() && (
        <p className="mt-2 text-text-prima">
          {t('validuntil')}: {getSubscriptionEndDate()}
        </p>
      )}
    </CardHeader>
  );
};
