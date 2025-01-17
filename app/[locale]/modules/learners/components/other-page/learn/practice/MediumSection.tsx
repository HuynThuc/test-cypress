import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/shared/components';
import { useToast } from '@/shared/hook';

import { MediumTopSection } from '@/modules/learners/components/other-page/learn/practice';
import {
  DefaultPracticeQuiz,
  MissingWord,
} from '@/modules/learners/constants/video-detail';
import { RootState } from '@/modules/learners/store';
import { seekTo } from '@/modules/learners/store/slice';
import {
  resetMediumQuestionIndex,
  setMediumResult,
} from '@/modules/learners/store/slice/video-detail';
import { IPracticeQuiz } from '@/modules/learners/types/video-detail';
import { playAudio } from '@/modules/learners/utils';

interface MediumSectionProps {
  mediumData: IPracticeQuiz[];
  mediumDataError: string | null;
}

export const MediumSection = ({
  mediumData,
  mediumDataError,
}: MediumSectionProps) => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { currentMediumQuestionIndex: questionIndex, mediumResult } =
    useSelector((state: RootState) => state.practiceStage);
  const questionData = mediumData[questionIndex] ?? DefaultPracticeQuiz;
  // utility variables
  const sentence = questionData.question;
  const choices = questionData.choices;
  const correctAnswers = questionData.correctAnswers;
  const totalQuestions = mediumData.length;
  const { startTime, duration } = questionData.subtitleInfo || {
    startTime: 0,
    duration: 0,
  };
  const remainingChoices = choices
    ? choices.filter((word) => !selectedWords.includes(word))
    : [];
  const currentQuizHistory = mediumResult[questionIndex]?.selectedAnswer || [];

  const EmptyBlock = () => (
    <span className="text-transparent select-none px-2 py-1 rounded-md border border-border/25 bg-border/5 mx-0.5">
      {MissingWord}
    </span>
  );

  const renderQuestion = (sentence: string) => {
    if (!sentence) return null;
    const parts = sentence.split('______');
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 &&
          (currentQuizHistory.length > 0 ? (
            <span
              className={`border rounded-md px-3 py-1 mx-0.5 ${currentQuizHistory[index] === correctAnswers[index] ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500'}`}
            >
              {currentQuizHistory[index]}
            </span>
          ) : !selectedWords[index] || selectedWords[index] === '' ? (
            <EmptyBlock key={index} />
          ) : (
            <span
              className="border rounded-md px-3 py-1 mx-0.5 cursor-pointer"
              onClick={() => {
                const newSelectedWords = [...selectedWords];
                newSelectedWords[index] = '';
                setSelectedWords(newSelectedWords);
              }}
            >
              {selectedWords[index]}
            </span>
          ))}
      </span>
    ));
  };
  const renderChoiceBlocks = () => {
    if (!remainingChoices) return null;
    return remainingChoices.map(
      (choice: string, idx: number) =>
        choice !== '' && (
          <div
            key={idx}
            className="border border-border/50 rounded px-3 py-0.5 cursor-pointer"
            onClick={() => handleWordClick(choice)}
          >
            {choice}
          </div>
        ),
    );
  };

  const renderCorrectAnswer = (sentence: string, correctAnswers: string[]) => {
    if (!sentence || !correctAnswers || currentQuizHistory.length === 0)
      return null;
    if (
      JSON.stringify(selectedWords) === JSON.stringify(correctAnswers) ||
      selectedWords.length !== correctAnswers.length
    )
      return null;
    const parts = sentence.split('______');
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && (
          <span className="text-green-600 underline underline-offset-2">
            {correctAnswers[index]}
          </span>
        )}
      </span>
    ));
  };

  const handleWordClick = (word: string) => {
    const emptyIndex = selectedWords.findIndex((item) => item === '');
    if (emptyIndex !== -1) {
      const newSelectedWords = [...selectedWords];
      newSelectedWords[emptyIndex] = word;
      setSelectedWords(newSelectedWords);
    }
  };

  const handleClear = () => {
    setSelectedWords(Array(correctAnswers.length).fill(''));
  };

  const handleCheck = () => {
    dispatch(
      setMediumResult(
        mediumResult.map((item, idx) =>
          idx === questionIndex
            ? { id: item.id, selectedAnswer: selectedWords }
            : item,
        ),
      ),
    );
    JSON.stringify(selectedWords) === JSON.stringify(correctAnswers)
      ? playAudio('/audios/correct.mp3')
      : playAudio('/audios/incorrect.mp3');
    JSON.stringify(selectedWords) === JSON.stringify(correctAnswers) &&
      toast({
        title: '🎉 Great job! 💪',
        description: 'You answered correctly!',
      });
  };

  useEffect(() => {
    setSelectedWords(Array(correctAnswers.length).fill(''));
    dispatch(seekTo(startTime / 1000));
  }, [questionIndex]);

  useEffect(() => {
    dispatch(resetMediumQuestionIndex());
    setSelectedWords(Array(correctAnswers.length).fill(''));
  }, []);

  return (
    <div className="h-full border border-border/20 rounded-lg shadow-e1 p-4 pb-8 flex flex-col gap-6 overflow-y-auto overflow-x-hidden scrollbar-transparent scrollbar-transparent overscroll-contain">
      <MediumTopSection
        handleClear={handleClear}
        totalQuestions={totalQuestions}
        startTime={startTime}
        duration={duration}
        disableClearChoice={mediumResult.length === 0}
      />
      {!mediumDataError ? (
        mediumData && mediumData.length > 0 ? (
          <div className="h-full min-h-fit flex flex-col gap-12">
            <div>
              <p className="text-border text-xs mb-3">Complete the sentence:</p>
              <span className="leading-8">{renderQuestion(sentence)}</span>
            </div>
            <span>{renderCorrectAnswer(sentence, correctAnswers)}</span>
            <div className="flex flex-wrap gap-2 justify-center">
              {renderChoiceBlocks()}
            </div>
            <Button
              className="bg-primary text-white self-center"
              onClick={handleCheck}
            >
              Check
            </Button>
          </div>
        ) : (
          <div className="w-full h-full px-4 text-center flex flex-col items-center justify-center gap-4">
            Sorry. The quizs for this part is currently not available.
          </div>
        )
      ) : (
        <div className="w-full h-full px-4 text-center flex flex-col items-center justify-center gap-4">
          {mediumDataError}
        </div>
      )}
    </div>
  );
};
