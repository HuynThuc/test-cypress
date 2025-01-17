import { usePathname } from 'next/navigation';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../constants';

export function useGetCurrentLocale(): string {
  const pathname = usePathname();
  let currentLocale = pathname.split('/')[1];
  if (!SUPPORTED_LOCALES.includes(currentLocale))
    currentLocale = DEFAULT_LOCALE;

  return currentLocale;
}
