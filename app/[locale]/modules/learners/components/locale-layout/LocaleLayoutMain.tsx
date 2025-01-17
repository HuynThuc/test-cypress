/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { NextIntlClientProvider } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Suspense, useEffect } from 'react';

import { SUPPORTED_LOCALES } from '@/shared/constants';
import SlidedSession from '@/shared/components/token-authen/slided-session';
import { LoadingIndicator } from '@/shared/components';
import { UpdateToken } from '@/shared/components/token-authen/updateToken';
import { apiClient } from '@/shared/api';

import enMessages from '@/app/locales/en.json';
import viMessages from '@/app/locales/vi.json';
import jaMessages from '@/app/locales/ja.json';

import { RootState } from '@/modules/learners/store';
import { PricingDialog } from '@/modules/learners/components/pricing/PricingDialog';

type Props = {
  children: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LOCALE_MESSAGES: Record<string, any> = {
  en: enMessages,
  vi: viMessages,
  ja: jaMessages,
};

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}
const LocaleLayoutMain = ({ children }: Props) => {
  const currentLocale =
    useSelector((state: RootState) => state.locale.currentLocale) || 'en';
  const messages = LOCALE_MESSAGES[currentLocale] || LOCALE_MESSAGES['en'];

  const currentColor = useSelector(
    (state: RootState) => state.color.primaryColor,
  );
  useEffect(() => {
    const htmlFocusElement = document.getElementById('html-focus');
    if (htmlFocusElement) {
      htmlFocusElement.style.setProperty('--primary-color', currentColor);
    }
    localStorage.setItem('primaryColor', currentColor);
  }, [currentColor, currentLocale]);
  const dispatch = useDispatch();
  apiClient.setDispatch(dispatch);
  return (
    <NextIntlClientProvider locale={currentLocale} messages={messages}>
      <SlidedSession />
      <UpdateToken />
      <Suspense fallback={<LoadingIndicator />}>{children}</Suspense>
      <PricingDialog />
    </NextIntlClientProvider>
  );
};

export default LocaleLayoutMain;
