import { NextRequest, NextResponse } from 'next/server';

import { SUPPORTED_LOCALES } from '@/shared/constants';

import { Locale, appConfig } from '@/app/configs/appConfig';

export const handleLocale = (request: NextRequest) => {
  const localeMatch = request.nextUrl.pathname.match(
    new RegExp(`^/(${SUPPORTED_LOCALES.join('|')})(/|$)`),
  );

  if (localeMatch) {
    const locale = localeMatch[1] as Locale;

    // Check if the locale is not already set in the cookie
    const storedLocaleCookie = request.cookies.get('NEXT_LOCALE');
    const storedLocale = storedLocaleCookie?.value;

    if (!storedLocale || storedLocale !== locale) {
      const response = NextResponse.next();
      response.cookies.set('NEXT_LOCALE', locale, { path: '/' });
      return response;
    }
  }

  return null;
};

export const redirectToPreferredLocale = (request: NextRequest) => {
  const storedLocale = request.cookies.get('NEXT_LOCALE');

  if (!storedLocale) {
    const acceptLanguage = request.headers.get('accept-language');

    if (acceptLanguage) {
      const languages = acceptLanguage
        .split(',')
        .map((lang) => lang.split(';')[0].trim());

      const preferredLocale = languages.find((lang) =>
        appConfig.locales.includes(lang as Locale),
      );

      if (preferredLocale && preferredLocale !== appConfig.defaultLocale) {
        const pathname = request.nextUrl.pathname;
        const search = request.nextUrl.search;
        const fullUrl = `/${preferredLocale}${pathname}${search}`;
        const response = NextResponse.redirect(fullUrl);
        response.cookies.set('NEXT_LOCALE', preferredLocale, { path: '/' });
        return response;
      }
    }
  }

  return null;
};
