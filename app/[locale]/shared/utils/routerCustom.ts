'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';

import { RootState } from '@/modules/learners/store';

export const useCustomRouter = (useGetCurrentLocale: () => string) => {
  const router = useRouter();
  const currentLocale = useGetCurrentLocale();
  const routePath = usePathname();
  const searchParams = useSearchParams();
  const locale = useSelector((state: RootState) => state.locale.currentLocale);

  const pushWithLocale = (
    args:
      | {
          url: string;
          params?: string | Record<string, string>;
          shallow?: boolean;
        }
      | string,
  ) => {
    if (!locale) return;

    const {
      url,
      params = '',
      shallow = true,
    } = typeof args === 'string'
      ? { url: args, params: '', shallow: true }
      : args;

    // Handle params as an object or string, converting object to a query string if necessary
    const queryString = params
      ? typeof params === 'string'
        ? params
        : new URLSearchParams(params).toString()
      : '';

    // Construct the full URL
    const fullUrl = `/${locale}${url}${queryString ? `?${queryString}` : ''}`;
    // Check if the locale has actually changed
    router.push(fullUrl, { shallow: shallow });
  };

  const pushWithReplace = (locale: string) => {
    let newRoute = routePath;

    if (newRoute.startsWith(`/${currentLocale}`))
      newRoute = `/${locale}${newRoute.slice(currentLocale.length + 1)}`;
    else newRoute = `/${locale}${newRoute}`;

    const queryParams = searchParams.toString();

    if (queryParams) newRoute += `?${queryParams}`;
    // Ensure the URL is replaced correctly and is different from the current URL
    if (newRoute !== routePath) router.replace(newRoute, { shallow: true });
  };

  // Other custom navigation logic can be added here as well, e.g., replace, back, etc.
  const push = (url: string, options = {}) => {
    router.push(url, options);
  };

  return {
    push,
    pushWithLocale,
    pushWithReplace,
  };
};
