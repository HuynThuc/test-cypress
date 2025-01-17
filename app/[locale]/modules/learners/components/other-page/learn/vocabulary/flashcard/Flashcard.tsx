/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
'use client';
import React, { useState, useEffect } from 'react';

import { type CarouselApi } from '@/shared/components/shacdn-ui/Carousel';

import type { IListVideoWords } from '@/modules/learners/types/video-detail/VideoDetail.types';
import type { WordProficiencyPayload } from '@/modules/learners/types/video-detail/VideoDetail.types';
import FlashcardFinish from '@/modules/learners/components/other-page/learn/vocabulary/flashcard/FlashcardFinish';
import FlashcardContent from '@/modules/learners/components/other-page/learn/vocabulary/flashcard/FlashcardContent';

interface FlashcardProps {
  wordsData: IListVideoWords[];
  onMoveToNextStage: () => void;
  onResetProgress: () => void;
}

export default function Flashcard({
  wordsData,
  onMoveToNextStage,
}: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0); // Current index of the flashcard
  const [api, setApi] = useState<CarouselApi>(); // Carousel API instance
  const [count, setCount] = useState(0); // Total number of flashcards

  useState<WordProficiencyPayload>({
    wordAndProficency: wordsData.map((item) => ({
      word: item.word.word,
      proficiencyLevel: 0,
    })),
  }); // State to track word proficiency levels
  const [summary, setSummary] = useState({
    total: wordsData.length,
    needReview: 0,
    gotIt: 0,
  }); // Summary of the flashcard session
  const [isCompleted, setIsCompleted] = useState(false); // Flag to check if the session is completed

  useEffect(() => {
    setSummary((prev) => ({
      ...prev,
      total: wordsData.length,
    }));
  }, [wordsData]); // Update summary when wordsData changes

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const selectedSnap = api.selectedScrollSnap();
      setCurrentIndex(selectedSnap);
    };

    setCount(api.scrollSnapList().length);
    setCurrentIndex(api.selectedScrollSnap());
    api.on('select', handleSelect);

    return () => {
      api.off('select', handleSelect);
    };
  }, [api]); // Initialize carousel API and handle selection changes

  const playAudio = (url: string) => {
    try {
      const audio = new Audio(url);
      audio.play();
    } catch (err) {
      console.error('Error initializing audio:', err);
    }
  }; // Function to play audio

  const handleNext = () => {
    if (currentIndex >= count - 1) {
      setIsCompleted(true);
      return;
    }

    if (currentIndex < count) api?.scrollNext();
  }; // Function to handle moving to the next flashcard

  const handlePrevious = () => {
    if (currentIndex > 0) api?.scrollPrev();
  }; // Function to handle moving to the previous flashcard

  const handleFinish = async () => {
    onMoveToNextStage();
  }; // Function to handle finishing the flashcard session

  const handleBack = () => {
    setIsCompleted(false);
  }; // Function to handle moving to the previous flashcard

  if (isCompleted)
    return (
      <FlashcardFinish
        listWord={wordsData}
        onFinish={handleFinish}
        onBack={handleBack}
      />
    );

  if (!wordsData || wordsData.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        WordsData is undefined or empty.
      </div>
    );
  }
  return (
    <FlashcardContent
      currentIndex={currentIndex}
      wordsData={wordsData}
      summary={summary}
      setApi={setApi}
      playAudio={playAudio}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
    />
  );
}
