type LocalePrefix = 'always' | 'as-needed' | 'never';

export type Locale = 'en' | 'ja' | 'vi';

export type AppConfig = {
  name: string;
  locales: Locale[];
  defaultLocale: Locale;
  localePrefix: LocalePrefix;
  timeZoneMap: Record<Locale, string>;
};

// localePrefix defaults to "always"
// "always": always display the language prefix (vi|ja|en)
// "as-needed": only display the prefix when it's not the default
// "never": do not display the language prefix
const localePrefix: LocalePrefix = 'as-needed';

export const appConfig: AppConfig = {
  name: 'RABITO ENGLISH',
  locales: ['en', 'ja', 'vi'],
  defaultLocale: 'en',
  localePrefix,
  timeZoneMap: {
    en: 'America/Los_Angeles',
    ja: 'Asia/Tokyo',
    vi: 'Asia/Ho_Chi_Minh',
  },
};
