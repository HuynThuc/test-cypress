import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/components';

import { IListVideoWords } from '@/modules/learners/types/video-detail';

interface FlashcardFinishProps {
  listWord: IListVideoWords[];
  onFinish: () => void;
  onBack: () => void;
}

export default function FlashcardFinish({
  listWord,
  onFinish,
  onBack,
}: FlashcardFinishProps) {
  const t = useTranslations('Learn');

  return (
    <div className="flex flex-col justify-center items-center gap-3 md:h-[calc(60vh-20px)]">
      <div className="flex flex-col items-center justify-center h-full text-center gap-3">
        <Image
          src="/images/rabbit.webp"
          alt="Congratulations!"
          width={200}
          height={200}
          className="md:w-[180px] md:h-[180px] w-[120px] h-[120px]"
        />
        <div className="font-normal text-lg flex flex-col gap-3">
          <div className="text-center px-4">
            <span className="text-primary text-lg font-bold font-['Comic Neue'] leading-normal block">
              {t('congratulations')}
            </span>
            <span className="md:text-lg text-sm font-bold font-['Comic Neue'] leading-normal">
              {t('youArelearned')}
              <span className="text-primary md:text-lg text-sm font-bold font-['Comic Neue'] leading-normal">
                {' '}
                {listWord.length}
              </span>
            </span>
            <span className="md:text-lg text-sm font-bold font-['Comic Neue'] leading-normal">
              {' '}
              {t('newVocabularyWordsInThisVideo')}
            </span>
          </div>
          <div className="text-center md:text-sm text-xs font-normal font-['Comic Neue'] leading-normal">
            {t('keepPracticing')}
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={onBack}
          className="h-9 w-36 bg-primary rounded text-text-onPrimary text-sm font-medium shadow justify-center items-center gap-1 flex cursor-pointer"
        >
          {t('back')}
        </Button>
        <div
          onClick={onFinish}
          className="h-9 w-36 bg-primary rounded shadow justify-center items-center gap-1 flex cursor-pointer"
        >
          <div className="text-text-onPrimary text-sm font-medium leading-normal">
            {t('quizTime')}
          </div>
        </div>
      </div>
    </div>
  );
}
