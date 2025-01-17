import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

import { PackagePlan } from '@/modules/learners/types/pricing/Pricing.types';

interface PricingCardContentProps {
  plan: PackagePlan;
  features: string[];
  isAffiliate: boolean;
  isCurrentPlan: boolean;
  onSubscribe: () => void;
}

export const PricingCardContent = ({
  plan,
  features,
  isAffiliate,
}: PricingCardContentProps) => {
  const t = useTranslations('Pricing');
  return (
    <div className="text-center flex-grow px-5">
      {isAffiliate ? (
        <span className="text-2xl font-bold text-primary">
          {t('freeaccess')}
        </span>
      ) : (
        <>
          <span className="text-5xl font-bold">${plan.finalAmount ?? 0}</span>
          <span className="text-xl">
            /{plan.value?.includes('monthly') ? 'mo' : 'yr'}
          </span>
          {(plan.discountPercentage ?? 0) > 0 && (
            <div>
              <span className="ml-2 text-lg line-through">
                ${plan.price ?? 0}
              </span>
              <span className="ml-2 text-lg font-semibold text-text-prima">
                {t('save')} {plan.discountPercentage}%
              </span>
            </div>
          )}
        </>
      )}
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="mr-2 h-5 w-5 text-text-prima" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
