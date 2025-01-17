import { CheckCircle2, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { EasyTopSection } from '@/modules/learners/components/other-page/learn/practice';
import {
  DefaultPracticeQuiz,
  MissingWord,
} from '@/modules/learners/constants/video-detail';
import { RootState } from '@/modules/learners/store';
import { seekTo } from '@/modules/learners/store/slice';
import { resetEasyQuestionIndex } from '@/modules/learners/store/slice/video-detail';
import { IPracticeQuiz } from '@/modules/learners/types/video-detail';
import { playAudio } from '@/modules/learners/utils';

interface EasySectionProps {
  easyData: IPracticeQuiz[];
  easyDataError: string | null;
}

export const EasySection = ({ easyData, easyDataError }: EasySectionProps) => {
  const [selection, setSelection] = useState(-1);
  const dispatch = useDispatch();
  const { currentEasyQuestionIndex: questionIndex } = useSelector(
    (state: RootState) => state.practiceStage,
  );
  const questionData = easyData[questionIndex] ?? DefaultPracticeQuiz;
  // utility variables
  const sentence = questionData.question;
  const choices = questionData.choices;
  const correctAnswers = questionData.correctAnswers[0];
  const totalQuestions = easyData.length;
  const { startTime, duration } = questionData.subtitleInfo || {
    startTime: 0,
    duration: 0,
  };

  const EmptyBlock = () => (
    <span className="text-transparent select-none px-2 py-1 rounded-md border border-border/25 bg-border/5 mx-0.5">
      {MissingWord}
    </span>
  );

  const chooseAnswer = (index: number) => {
    selection < 0 && setSelection(index);
    index === choices.indexOf(correctAnswers)
      ? playAudio('/audios/correct.mp3')
      : playAudio('/audios/incorrect.mp3');
  };

  const renderQuestion = (sentence: string) => {
    if (!sentence) return null;
    const parts = sentence.split('______');
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < parts.length - 1 && <EmptyBlock key={index} />}
      </span>
    ));
  };

  const renderChoices = (choices: string[]) => {
    if (!choices) return null;
    if (selection < 0) {
      return choices.map((choice, index) => (
        <button
          key={index}
          className="flex justify-center items-center h-12 border border-border/25 shadow-e1 rounded text-label-large text-text-secondary hover:border-border"
          onClick={() => chooseAnswer(index)}
        >
          {index + 1}. {choice}
        </button>
      ));
    }
    return choices.map((choice, index) =>
      index === selection ? (
        <button
          key={index}
          className={`cursor-default flex justify-center gap-2 items-center h-12 border border-border/[0.12] shadow-e1 rounded text-label-large ${choice === correctAnswers ? 'border-green-500 text-green-500 border-2' : 'border-red-500 text-red-500 border-2'}`}
        >
          {choice === correctAnswers ? <CheckCircle2 /> : <XCircle />} {choice}
        </button>
      ) : (
        <button
          key={index}
          className={`cursor-default flex justify-center items-center h-12 border border-border/[0.12] shadow-e1 rounded text-label-large ${choice === correctAnswers ? 'text-green-500 border-green-500' : 'text-text-secondary'}`}
        >
          {index + 1}. {choice}
        </button>
      ),
    );
  };

  useEffect(() => {
    setSelection(-1);
    dispatch(seekTo(startTime / 1000));
  }, [questionIndex]);

  useEffect(() => {
    dispatch(resetEasyQuestionIndex());
  }, []);

  return (
    <div className="h-full border border-border/20 rounded-lg shadow-e1 p-4 flex flex-col gap-4 overflow-auto scrollbar-transparent scrollbar-transparent overscroll-contain">
      <EasyTopSection
        totalQuestions={totalQuestions}
        startTime={startTime}
        duration={duration}
      />
      {!easyDataError ? (
        easyData && easyData.length > 0 ? (
          <>
            <div className="flex flex-col">
              <p className="text-border text-xs mb-3">Complete the sentence:</p>
              <span className="leading-8">{renderQuestion(sentence)}</span>
            </div>
            <div className="flex flex-col gap-3 mt-6">
              {renderChoices(choices)}
            </div>
          </>
        ) : (
          <div className="w-full h-full px-4 text-center flex flex-col items-center justify-center gap-4">
            Sorry. The quizs for this part is currently not available.
          </div>
        )
      ) : (
        <div className="w-full h-full px-4 text-center flex flex-col items-center justify-center gap-4">
          {easyDataError}
        </div>
      )}
    </div>
  );
};
