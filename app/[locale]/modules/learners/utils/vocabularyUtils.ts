import { IListVideoWords } from '@/modules/learners/types/video-detail/VideoDetail.types';

export const handleWordSelection = (
  word: string,
  selectedWords: string[],
  setSelectedWords: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  setSelectedWords((prev) =>
    prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word],
  );
};

export const handleToggleAllWords = (
  wordsData: IListVideoWords[],
  selectedWords: string[],
  setSelectedWords: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const allWords = wordsData.map((item) => item.word.word);
  setSelectedWords(selectedWords.length === allWords.length ? [] : allWords);
};
