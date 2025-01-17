/**
 * Interface representing the localized titles.
 *
 * @interface ITitleLocale
 *
 * @property {string} en - The title in English.
 * @property {string} vi - The title in Vietnamese.
 * @property {string} ja - The title in Japanese.
 *
 * @note This interface is used to define the structure for title localization in different languages.
 */
export interface ITitleLocale {
  en: string;
  vi: string;
  ja: string;
  [key: string]: string;
}
