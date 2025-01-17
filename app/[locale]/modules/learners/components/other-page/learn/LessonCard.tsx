'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';

import { RootState } from '@/modules/learners/store';
import { setLearningStage } from '@/modules/learners/store/slice/video-detail/learningStageSlice';
import {
  StageContent,
  StageList,
} from '@/modules/learners/components/other-page/learn/stage-menu';
import {
  IListVideoWords,
  IPracticeQuiz,
} from '@/modules/learners/types/video-detail/VideoDetail.types';
import { closePopupVocab } from '@/modules/learners/store/slice';

export default function LessonCard({
  wordData,
  wordDataError,
  easyData,
  easyDataError,
  mediumData,
  mediumDataError,
}: {
  wordData: IListVideoWords[] | [];
  wordDataError: string | null;
  easyData: IPracticeQuiz[] | [];
  easyDataError: string | null;
  mediumData: IPracticeQuiz[] | [];
  mediumDataError: string | null;
}) {
  const t = useTranslations('Learn');
  const dispatch = useDispatch();
  dispatch(closePopupVocab()); //fix open popup vocab when change stage

  const { currentStageIndex, stageCompletion } = useSelector(
    (state: RootState) => state.learningStage,
  );

  const handleStageClick = (newStageIndex: number) => {
    dispatch(setLearningStage(newStageIndex));
  };

  return (
    <div className="md:h-[calc(100vh-100px)] h-[calc(60vh-10px)] md:max-h-[820px] md:min-h-[515px] min-h-[495px] w-full shadow-e1 rounded-xl bg-surface">
      <div className="md:pt-4 pt-2 h-full flex flex-col">
        <h2 className="md:px-4 px-2 md:text-xl md:block hidden font-semibold md:mb-2 mb-[3px]">
          {t('learningTools')}
        </h2>
        <div id="second-step" className="md:px-4 px-2 my-2 mt-1">
          <StageList
            currentStageIndex={currentStageIndex}
            stageCompletion={stageCompletion}
            handleStageClick={handleStageClick}
          />
        </div>
        <div className="h-full w-full overflow-hidden">
          <StageContent
            currentStageIndex={currentStageIndex}
            wordData={wordData}
            wordDataError={wordDataError}
            easyData={easyData}
            easyDataError={easyDataError}
            mediumData={mediumData}
            mediumDataError={mediumDataError}
          />
        </div>
      </div>
    </div>
  );
}
