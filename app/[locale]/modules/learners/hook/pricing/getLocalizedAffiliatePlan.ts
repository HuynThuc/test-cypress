import { Locale } from '@/app/configs/appConfig';

import { PackageType } from '@/modules/learners/types/pricing/Pricing.types';

export function getLocalizedAffiliatePlan(locale: Locale) {
  const translations: Record<Locale, { name: string; description: string }> = {
    en: {
      name: 'Affiliate Plan',
      description: 'Get limited-time access to pro features',
    },
    vi: {
      name: 'Gói Đối Tác',
      description:
        'Nhận quyền truy cập các tính năng cao cấp trong thời gian giới hạn',
    },
    ja: {
      name: 'アフィリエイトプラン',
      description: 'プロ機能への期間限定アクセスを取得する',
    },
  };

  // Fallback to English if locale not found
  const localizedPlan = translations[locale] || translations.en;

  return {
    name: localizedPlan.name,
    description: localizedPlan.description,
    price: 0,
    discountPercentage: 0,
    finalAmount: 0,
    currency: 'USD',
    value: PackageType.AFFILIATE,
  };
}
