import { PackageType } from '@/modules/learners/types/pricing/Pricing.types';

export const planFeatures: Record<PackageType, string[]> = {
  [PackageType.MONTHLY]: [
    'Basic listening practice',
    'Limited video content',
    'Basic quizzes',
    'Progress tracking',
  ],
  [PackageType.YEARLY]: [
    'Unlimited listening practice',
    'Full video library access',
    'Advanced quizzes',
    'Detailed progress tracking',
    'Offline mode',
    'Ad-free experience',
    'Personalized learning path',
    'Priority support',
  ],
  [PackageType.AFFILIATE]: [
    'Limited-time pro access',
    'Full video library access',
    'Advanced quizzes',
    'Progress tracking',
    'Ad-free experience',
  ],
  [PackageType.MONTHLY_VI]: [
    'Basic listening practice (Vietnamese)',
    'Limited video content',
    'Basic quizzes in Vietnamese',
    'Progress tracking',
  ],
  [PackageType.YEARLY_VI]: [
    'Unlimited listening practice (Vietnamese)',
    'Full video library access',
    'Advanced quizzes in Vietnamese',
    'Detailed progress tracking',
    'Offline mode',
    'Ad-free experience',
    'Personalized learning path',
    'Priority support in Vietnamese',
  ],
};
