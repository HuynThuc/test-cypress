import { useLocale } from 'next-intl';

import { SUPPORTED_LOCALES } from '@/shared/constants';

// Function to convert string based on the current language
export function LanguageToString(nameObj: { [locale: string]: string }) {
  const locale = useLocale();

  // Return the string according to the locale, if not available, use default English
  return nameObj[locale] || nameObj[SUPPORTED_LOCALES[1]];
}
// Function to convert string based on the provided locale
export function LanguageToStringLocale(
  nameObj: { [locale: string]: string },
  locale: string,
) {
  return nameObj[locale] || nameObj[SUPPORTED_LOCALES[1]]; // Default to 'en' if the locale is not available
}
