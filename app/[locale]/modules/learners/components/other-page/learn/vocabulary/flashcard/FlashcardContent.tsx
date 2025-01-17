/* eslint-disable no-unused-vars */
'use client';
import React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/shared/components/shacdn-ui/Carousel';

import type { IListVideoWords } from '@/modules/learners/types/video-detail/VideoDetail.types';
import CardItem from '@/modules/learners/components/other-page/learn/vocabulary/flashcard/CardItem';

interface FlashcardContentProps {
  currentIndex: number;
  wordsData: IListVideoWords[];
  summary: {
    total: number;
    needReview: number;
    gotIt: number;
  };

  setApi: (api: CarouselApi) => void;
  playAudio: (url: string) => void;
  handlePrevious: () => void;
  handleNext: () => void;
}

export default function FlashcardContent({
  currentIndex,
  wordsData,
  summary,

  setApi,
  playAudio,
  handlePrevious,
  handleNext,
}: FlashcardContentProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow flex items-center justify-center">
        <Carousel
          className="w-full max-w-3xl"
          setApi={setApi}
          opts={{
            align: 'center',
          }}
        >
          <CarouselContent>
            {wordsData.map((item, index) => (
              <CarouselItem key={index}>
                <CardItem
                  item={item}
                  gotIt={summary.gotIt}
                  needReview={summary.needReview}
                  total={summary.total}
                  playAudio={playAudio}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className={`absolute md:left-2 left-[-20px] md:ml-2 text-text-light hover:text-primary transition shadow-e2 border-none
              ${currentIndex > 0 ? 'text-primary' : ''}`}
            onClick={handlePrevious}
            style={{ boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)' }}
          />
          <CarouselNext
            className={`absolute md:right-2 right-[-20px] md:mr-2 text-text-light hover:text-primary transition shadow-e2 border-none
              ${currentIndex <= wordsData.length ? 'text-primary' : ''}`}
            onClick={handleNext}
            style={{ boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)' }}
            disabled={currentIndex > wordsData.length}
          />
        </Carousel>
      </div>
    </div>
  );
}
