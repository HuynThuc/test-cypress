import {
  IProcessedSubtitle,
  ISubtitle,
} from '../types/video-detail/VideoDetail.types';

function splitSentenceIntoWordsWithSpaces(sentence: string): string[] {
  // Using a regular expression to split the sentence into words
  // const words = sentence.split(/(\s+|[,.!?:"]+|'(?=\w)|(?<=\w)')/);
  const words = sentence.match(/\b\w+(?:'\w+)?\b|[^\w\s]+|\s+/g);
  return words || [];
}

export function processSubtitlesWithSpaces(
  sentences: ISubtitle[],
): IProcessedSubtitle[] {
  if (!sentences) return [];
  return sentences.map((sentence) => {
    return {
      ...sentence,
      text: splitSentenceIntoWordsWithSpaces(sentence.text),
    };
  });
}

export function splitSentenceToWords(sentence: string): string[] {
  // Remove specified characters before splitting
  sentence = sentence.replace(/[?/"//]/g, '');
  // Split the sentence by whitespace, commas, or periods
  return sentence
    .trim()
    .split(/[\s,.]+/)
    .filter((word) => word.length > 0);
}

export function processSubtitles(sentences: ISubtitle[]): IProcessedSubtitle[] {
  if (!sentences) return [];
  return sentences.map((sentence) => {
    return {
      ...sentence,
      text: splitSentenceToWords(sentence.text),
    };
  });
}
