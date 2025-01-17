export const GetLocaleFullname = (locale: string) => {
  switch (locale) {
    case 'en':
      return 'English';
    case 'ja':
      return '日本語';
    case 'vi':
      return 'Tiếng Việt';
    default:
      return 'English';
  }
};
