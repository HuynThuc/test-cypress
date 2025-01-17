/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

import {
  PackagePlan,
  PackageType,
  Subscription,
} from '@/modules/learners/types/pricing/Pricing.types';
import { planFeatures } from '@/modules/learners/constants/pricing/plan';
import { PricingCard } from '@/modules/learners/components/pricing/PricingCard';

interface PricingCardListProps {
  plans: PackagePlan[];
  currentSubscription: Subscription | null;
  onSubscribe: (plan: PackageType) => void;
}

const cardVariants = {
  hidden: (direction: string) => ({
    opacity: 0,
    scale: 0.8,
    x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
  }),
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 20,
    },
  },
};

// Helper function to determine if the current plan is active
const isCurrentPlan = (
  planValue: string,
  currentSubscription: Subscription | null,
) => {
  return (
    currentSubscription?.packagePlan === planValue &&
    currentSubscription?.status === 'active'
  );
};

// Helper function to determine the animation direction
const getDirection = (index: number) => {
  if (index % 3 === 0) return 'center';
  if (index % 3 === 1) return 'right';
  return 'left';
};

// Function to render Pricing Cards
const renderPricingCards = (
  plans: PackagePlan[],
  currentSubscription: Subscription | null,
  onSubscribe: (plan: PackageType) => void,
) => {
  return plans.map((plan, index) => {
    const direction = getDirection(index);
    const currentPlanStatus = isCurrentPlan(plan.value, currentSubscription);

    return (
      <motion.div
        key={plan.value}
        custom={direction}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="w-full lg:w-1/3 md:w-4/12 md:p-0 px-4 md:min-h-[610px] bg-background"
      >
        <PricingCard
          plan={plan}
          features={planFeatures[plan.value as PackageType] ?? []}
          onSubscribe={() => onSubscribe(plan.value as PackageType)}
          isCurrentPlan={currentPlanStatus}
          currentSubscription={currentSubscription}
        />
      </motion.div>
    );
  });
};

export function PricingCardList({
  plans,
  currentSubscription,
  onSubscribe,
}: PricingCardListProps) {
  return (
    <div className="flex flex-col md:flex-row xl:justify-center md:justify-between items-center md:items-stretch xl:gap-8 gap-3 mx-auto md:p-0 pb-5">
      {renderPricingCards(plans, currentSubscription, onSubscribe)}
    </div>
  );
}
