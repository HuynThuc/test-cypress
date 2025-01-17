/* eslint-disable no-unused-vars */
'use client';
import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { IListVideoWords } from '@/modules/learners/types/video-detail/VideoDetail.types';
import type { WordProficiencyPayload } from '@/modules/learners/types/video-detail/VideoDetail.types';
import { completeStage } from '@/modules/learners/store/slice/video-detail/learningStageSlice';
import QuizContent from '@/modules/learners/components/other-page/learn/vocabulary/quiz/QuizContent';
import QuizFinish from '@/modules/learners/components/other-page/learn/vocabulary/quiz/QuizFinish';
import { RootState } from '@/modules/learners/store';
import { playAudio as playAudioResult } from '@/modules/learners/utils';

interface QuizProps {
  listWord: IListVideoWords[];
  onMoveToNextStage: () => void;
  onResetProgress: () => void;
  onUpdateWordProficiency: (payload: WordProficiencyPayload) => Promise<void>;
}

export default function Quiz({
  onMoveToNextStage,
  onResetProgress,
  onUpdateWordProficiency,
}: QuizProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const listWord = useSelector(
    (state: RootState) => state.learningStage.listWord,
  );
  const [wordProficiency, setWordProficiency] =
    useState<WordProficiencyPayload>(() => ({
      wordAndProficency: listWord.map((item) => ({
        word: item.word.word,
        proficiencyLevel: item.proficiencyLevel,
      })),
    }));
  const dispatch = useDispatch();

  const currentQuizItem = listWord[currentWordIndex];
  const currentWord = currentQuizItem?.word;

  const answerOptions = useMemo(() => {
    if (!currentQuizItem) return [];

    const allOptions = [
      currentQuizItem.word.word,
      ...currentQuizItem.similarWords,
    ];
    const uniqueOptions = Array.from(new Set(allOptions));

    for (let i = uniqueOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [uniqueOptions[i], uniqueOptions[j]] = [
        uniqueOptions[j],
        uniqueOptions[i],
      ];
    }

    if (uniqueOptions.length > 3) {
      const correctAnswerIndex = uniqueOptions.indexOf(
        currentQuizItem.word.word,
      );
      if (correctAnswerIndex >= 3) {
        const randomIndex = Math.floor(Math.random() * 3);
        [uniqueOptions[randomIndex], uniqueOptions[correctAnswerIndex]] = [
          uniqueOptions[correctAnswerIndex],
          uniqueOptions[randomIndex],
        ];
      }
    }

    return uniqueOptions.slice(0, 3);
  }, [currentQuizItem]);

  const playAudio = () => {
    if (currentWord && currentWord.definitions[0]) {
      new Audio(currentWord.definitions[0].pronunciationUSMp3).play();
    }
  };

  const handleAnswerSelect = (answer: string) => {
    const isAnswerCorrect = answer === currentWord?.word;
    setSelectedAnswer(answer);
    setIsCorrect(isAnswerCorrect);
    isAnswerCorrect
      ? playAudioResult('/audios/correct.mp3')
      : playAudioResult('/audios/incorrect.mp3');

    setWordProficiency((prev) => {
      const updatedWordAndProficency = [...prev.wordAndProficency];
      const existingWordIndex = updatedWordAndProficency.findIndex(
        (item) => item.word === currentWord?.word,
      );

      if (existingWordIndex !== -1) {
        updatedWordAndProficency[existingWordIndex] = {
          ...updatedWordAndProficency[existingWordIndex],
          proficiencyLevel: isAnswerCorrect
            ? Math.min(
                updatedWordAndProficency[existingWordIndex].proficiencyLevel +
                  1,
                5,
              )
            : Math.max(
                updatedWordAndProficency[existingWordIndex].proficiencyLevel -
                  1,
                1,
              ),
        };
      }

      return { wordAndProficency: updatedWordAndProficency };
    });
  };

  const handleNextQuestion = async () => {
    if (currentWordIndex === listWord.length - 1) {
      await onUpdateWordProficiency(wordProficiency);
      setShowCongratulations(true);
    } else {
      setCurrentWordIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const handleComplete = () => {
    dispatch(completeStage('vocabulary'));
    onMoveToNextStage();
  };

  if (listWord.length === 0) {
    return (
      <QuizFinish
        message="No words available for quiz"
        subMessage="Please go back and select some words to practice."
        onResetProgress={onResetProgress}
        onMoveToNextStage={handleComplete}
      />
    );
  }

  if (showCongratulations) {
    return (
      <QuizFinish
        message="Congratulations!"
        subMessage="You've completed the quiz for all words."
        onMoveToNextStage={handleComplete}
      />
    );
  }

  return (
    <QuizContent
      currentWord={currentWord}
      answerOptions={answerOptions}
      selectedAnswer={selectedAnswer}
      isCorrect={isCorrect}
      isLastQuestion={currentWordIndex === listWord.length - 1}
      playAudio={playAudio}
      handleAnswerSelect={handleAnswerSelect}
      handleNextQuestion={handleNextQuestion}
    />
  );
}
