/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';

import { Card } from '@/shared/components/shacdn-ui/Card';

import {
  PackagePlan,
  PackageType,
  Subscription,
} from '@/modules/learners/types/pricing/Pricing.types';
import {
  PricingCardHeader,
  PricingCardContent,
  PricingCardFooter,
} from '@/modules/learners/components/pricing/widget';

interface PricingCardProps {
  plan: PackagePlan;
  features: string[];
  onSubscribe: () => void;
  isCurrentPlan: boolean;
  currentSubscription: Subscription | null;
}

export function PricingCard({
  plan,
  features,
  onSubscribe,
  isCurrentPlan,
  currentSubscription,
}: PricingCardProps) {
  const isAffiliate = plan.value === PackageType.AFFILIATE;

  const getSubscriptionEndDate = () => {
    if (isCurrentPlan && currentSubscription?.endDate) {
      const endDate = new Date(currentSubscription.endDate);
      return endDate.toLocaleDateString();
    }
    return null;
  };

  // Conditionally use motion.div for medium and larger screens
  const MotionDiv = (props: any) =>
    typeof window !== 'undefined' && window.innerWidth >= 768 ? (
      <motion.div
        className="h-full"
        whileHover={{ scale: isCurrentPlan ? 1 : 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {props.children}
      </motion.div>
    ) : (
      <div className="h-full">{props.children}</div>
    );
  return (
    <MotionDiv>
      <Card
        className={`h-full flex flex-col overflow-hidden border-2 min-h-[550px] 
          ${isCurrentPlan ? 'border-success' : isAffiliate ? 'border-primary' : 'border-border'} 
          ${isCurrentPlan ? 'opacity-75' : ''} shadow-lg`}
      >
        <PricingCardHeader
          plan={plan}
          isCurrentPlan={isCurrentPlan}
          getSubscriptionEndDate={getSubscriptionEndDate}
        />
        <PricingCardContent
          plan={plan}
          features={features}
          isAffiliate={isAffiliate}
          isCurrentPlan={isCurrentPlan}
          onSubscribe={onSubscribe}
        />
        <PricingCardFooter
          isAffiliate={isAffiliate}
          isCurrentPlan={isCurrentPlan}
          onSubscribe={onSubscribe}
        />
      </Card>
    </MotionDiv>
  );
}
