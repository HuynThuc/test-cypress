import createMiddleware from 'next-intl/middleware';

import { appConfig } from '@/app/configs/appConfig';

export const intlMiddleware = createMiddleware({
  locales: appConfig.locales,
  localePrefix: appConfig.localePrefix,
  defaultLocale: appConfig.defaultLocale,
});
