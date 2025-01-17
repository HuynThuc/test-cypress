export const accentToString = (accent: string): string => {
  switch (accent.toLowerCase()) {
    case 'us':
      return '(US)';
    case 'uk':
      return '(UK)';
    default:
      return '';
  }
};
