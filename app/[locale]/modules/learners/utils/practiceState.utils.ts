export function getWordIndex(sentence: string): number {
  const words = sentence.trim().split(/\s+/);
  return sentence.trimEnd().endsWith(' ') ? words.length : words.length - 1;
}

export function getCurrentWord(sentence: string): string {
  const words = sentence.trimEnd().split(/\s+/);
  return words[words.length - 1] || '';
}

export function hideWord(word: string) {
  return '_'.repeat(word.length);
}
