import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components';
interface PricingCardFooterProps {
  isAffiliate: boolean;
  isCurrentPlan: boolean;
  onSubscribe: () => void;
}

export const PricingCardFooter = ({
  isAffiliate,
  isCurrentPlan,
  onSubscribe,
}: PricingCardFooterProps) => {
  const t = useTranslations('Pricing');
  return (
    <div className="p-5">
      <Button
        className={`w-full ${
          isCurrentPlan
            ? 'bg-primary text-text-onPrimary cursor-not-allowed'
            : 'bg-primary text-text-onPrimary hover:bg-opacity-90'
        } transition-all duration-300`}
        onClick={onSubscribe}
        disabled={isCurrentPlan}
      >
        {isAffiliate
          ? t('getfreeaccess')
          : isCurrentPlan
            ? t('currentplan')
            : t('getstarted')}
      </Button>
    </div>
  );
};
