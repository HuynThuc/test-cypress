/* eslint-disable no-unused-vars */
'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { FiLoader } from 'react-icons/fi';

import { Button } from '@/shared/components';
import { cn } from '@/shared/utils';

import type {
  IGetVideoWordsResponse,
  IListVideoWords,
} from '@/modules/learners/types/video-detail/VideoDetail.types';
import type { WordProficiencyPayload } from '@/modules/learners/types/video-detail/VideoDetail.types';
import { WordCard } from '@/modules/learners/components/other-page/learn/vocabulary/overview/WordCard';
import { RootState } from '@/modules/learners/store';
import { fetchWords } from '@/modules/learners/services/video-detail/fetchWords.service';
import { setListWord } from '@/app/[locale]/modules/learners/store/slice/video-detail/learningStageSlice';

interface ChooseVocabularyProps {
  wordsData: IListVideoWords[];
  selectedWords: string[];
  onWordSelection: (word: string) => void;
  onMoveToNextStage: () => void;
  onResetProgress: () => void;
  onUpdateWordProficiency: (payload: WordProficiencyPayload) => Promise<void>;
  isGuest: boolean;
}

export default function ChooseVocabulary({
  wordsData,
  selectedWords,
  onWordSelection,
  onMoveToNextStage,
  onUpdateWordProficiency,
  isGuest,
}: ChooseVocabularyProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('Learn');
  const videoId = useSelector(
    (state: RootState) => state.youtubePlayer.videoId,
  );

  const dispatch = useDispatch();
  const handleLearnSelectedWords = async () => {
    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    setIsLoading(true);
    await fetchWords(youtubeUrl, true, isGuest).then(
      (value: IGetVideoWordsResponse | null) => {
        if (value && value.data) {
          dispatch(setListWord(value.data));
          if (isGuest) {
            onMoveToNextStage();
            setIsLoading(false);
            return;
          }
        }
      },
    );

    if (selectedWords.length > 0) {
      const payload = {
        wordAndProficency: selectedWords.map((word) => ({
          word,
          proficiencyLevel: 1,
        })),
      };

      try {
        await onUpdateWordProficiency(payload);
        onMoveToNextStage();
      } catch (err) {
        setError('Failed to update word proficiency. Please try again.');
      }
    }
  };

  if (error) {
    return <div className="text-error text-center p-4">{error}</div>;
  }
  return (
    <>
      <div className="space-y-4 md:h-[calc(80vh-140px)] 3xl:h-[calc(70vh-20px)] h-[calc(55vh-80px)] min-h-[350px] max-h-[660px] overflow-y-auto scrollbar-transparent overscroll-contain">
        <div className="bg-surface rounded-lg h-full w-full">
          <div className="h-full w-full rounded-lg flex flex-col gap-4">
            {wordsData.map(
              (item, index) =>
                item.word && (
                  <WordCard
                    proficiencyLevel={item.proficiencyLevel}
                    key={index}
                    word={item.word}
                    isSelected={selectedWords.includes(item.word.word)}
                    onSelect={() => onWordSelection(item.word.word)}
                  />
                ),
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-4">
        {isLoading ? (
          <FiLoader className="animate-spin" size={32} />
        ) : (
          <Button
            className={cn(
              'w-full sm:w-auto',
              selectedWords.length > 0 && 'bg-primary text-text-onPrimary',
            )}
            disabled={selectedWords.length === 0}
            onClick={handleLearnSelectedWords}
          >
            {t('learn')} {selectedWords.length} {t('selectedWords')}
          </Button>
        )}
      </div>
    </>
  );
}
