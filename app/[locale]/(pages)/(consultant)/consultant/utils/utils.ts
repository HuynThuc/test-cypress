export const SUPPORTED_LOCALES = ['en', 'ja', 'vi'];

type LocalizedContent =
  | string
  | string[]
  | { [key: string]: string | string[] };

export function LanguageToStringAtLocal(
  content: LocalizedContent,
  locale: string,
): string | string[] {
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content;
  }

  if (typeof content === 'object') {
    return content[locale] || content[SUPPORTED_LOCALES[0]] || '';
  }

  return '';
}
