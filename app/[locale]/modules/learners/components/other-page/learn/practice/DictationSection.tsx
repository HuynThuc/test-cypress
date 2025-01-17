'use client';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { RootState } from '@/modules/learners/store';
import { DictationTopSection } from '@/modules/learners/components/other-page/learn/practice';
import {
  getWordIndex,
  hideWord,
  splitSentenceToWords,
} from '@/modules/learners/utils';

export const DictationSection = () => {
  const [typedWords, setTypedWords] = useState<string[]>(['']);
  const [wordIdx, setWordIdx] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [visibleWordIdx, setVisibleWordIdx] = useState<number | null>(null);
  const { processedSubtitles } = useSelector(
    (state: RootState) => state.youtubePlayer,
  );
  const { currentSubtitleIdx } = useSelector(
    (state: RootState) => state.practiceStage,
  );

  const numOfSubtitles = processedSubtitles ? processedSubtitles.length : 0;
  const result =
    Array.isArray(processedSubtitles) &&
    currentSubtitleIdx >= 0 &&
    currentSubtitleIdx < processedSubtitles.length
      ? processedSubtitles[currentSubtitleIdx].text
      : [''];

  const checkCurrentWord = (input: string) => {
    setTypedWords(input ? splitSentenceToWords(input) : ['']);
    setTextInput(input);
    setWordIdx(getWordIndex(input));
  };

  const calculateMatching = () => {
    if (typedWords.length === 0) return 0;
    const minLength = Math.min(typedWords.length, result.length);
    const maxLength = Math.max(typedWords.length, result.length);
    let matchCount = 0;
    for (let i = 0; i < minLength; i++) {
      if (typedWords[i].toLowerCase() === result[i].toLowerCase()) matchCount++;
    }
    return Math.round((matchCount / maxLength) * 100);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest('.word-block')) {
      setVisibleWordIdx(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const renderWordBlocks = () => {
    return result.map((word: string, idx: number) => {
      const currentWord = typedWords[wordIdx];
      const check = currentWord
        ? word.toLowerCase() === currentWord.toLowerCase()
          ? 1
          : 2
        : 0; // 0: empty word, 1: match, 2: not match

      return (
        <div
          key={idx}
          className="border border-border/50 rounded px-3 py-0.5 h-fit word-block cursor-pointer"
          onClick={() => setVisibleWordIdx(idx)}
        >
          {idx === wordIdx ? (
            check === 0 ? (
              <span
                className={visibleWordIdx === idx ? '' : 'tracking-[0.15em]'}
              >
                {visibleWordIdx === idx ? word : hideWord(word)}
              </span>
            ) : (
              <span className={check === 1 ? 'text-green-500' : 'text-red-500'}>
                {currentWord}
              </span>
            )
          ) : idx < wordIdx ? (
            <span
              className={
                typedWords[idx].toLowerCase() === word.toLowerCase()
                  ? 'text-green-500'
                  : 'text-red-500'
              }
            >
              {typedWords[idx]}
            </span>
          ) : (
            <span className={visibleWordIdx === idx ? '' : 'tracking-[0.15em]'}>
              {visibleWordIdx === idx ? word : hideWord(word)}
            </span>
          )}
        </div>
      );
    });
  };

  useEffect(() => {
    setTypedWords(['']);
    setWordIdx(0);
    setTextInput('');
  }, [currentSubtitleIdx]);

  return (
    <div className="border border-border/20 rounded-lg shadow-e1 p-4 h-full overflow-hidden flex flex-col pb-6 gap-6">
      <DictationTopSection totalSentences={numOfSubtitles} />
      <div
        id="inputWord-step"
        className="flex flex-col h-full gap-1 overflow-auto scrollbar-transparent scrollbar-transparent overscroll-contain"
      >
        {numOfSubtitles ? (
          <>
            <textarea
              name="dictation"
              value={textInput}
              placeholder="Type what you hear"
              className="resize-none shadow-inset bg-surface border border-border/25 w-full min-h-36 p-4 rounded focus-visible:outline-none"
              onInput={(e) => checkCurrentWord(e.currentTarget.value)}
            ></textarea>
            <span className="self-end text-label-large text-border">
              Matching:{' '}
              <span
                className={
                  calculateMatching() === 100
                    ? 'text-green-500'
                    : 'text-[#FF5C5C]'
                }
              >
                {calculateMatching()}%
              </span>
            </span>
            <div
              id="hintWord-step"
              className="h-fit flex flex-wrap gap-2 pb-0.5 mt-3"
            >
              {renderWordBlocks()}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            Sorry. This video subtitles is currently not available.
          </div>
        )}
      </div>
    </div>
  );
};
