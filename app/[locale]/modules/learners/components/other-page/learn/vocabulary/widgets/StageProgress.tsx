/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import React from 'react';
import { IoChevronForward } from 'react-icons/io5';
import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';

import { Button } from '@/shared/components';
import { Icons } from '@/shared/components/Icon/icons';

import { LearningStagesDropdown } from '@/modules/learners/components/other-page/learn/vocabulary/widgets/LearningStagesDropdown';
import {
  StageId,
  vocabularyStages,
} from '@/modules/learners/constants/video-detail/vocabulary/VocabularyStageDefinition';
import { setLearningStage } from '@/modules/learners/store/slice/video-detail/learningStageSlice';

export const StageProgress = ({
  stages,
  currentStage,
  stageStatus,
  onStageChange,
  onToggleAll,
}: {
  stages: any;
  currentStage: StageId;
  stageStatus: any;
  onStageChange: (stage: StageId) => void;
  onToggleAll: () => void;
}) => {
  const t = useTranslations('Learn');
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center">
      <LearningStagesDropdown
        stages={stages}
        currentStage={currentStage}
        stageStatus={stageStatus}
        onStageChange={onStageChange}
      />
      {currentStage == vocabularyStages[1].id ? (
        <Button
          onClick={onToggleAll}
          variant="ghost"
          size="sm"
          className="text-primary font-medium text-sm flex items-center shrink-0"
        >
          <span>{t('goToQuiz')}</span>
          <IoChevronForward className="h-4 w-4" />
        </Button>
      ) : currentStage == vocabularyStages[0].id ? (
        <Button onClick={onToggleAll} variant="ghost" size="sm">
          <Icons.listCheck className="h-6 w-6" />
        </Button>
      ) : (
        <Button
          onClick={() => dispatch(setLearningStage(1))}
          variant="ghost"
          size="sm"
          className="text-primary font-medium text-sm flex items-center shrink-0"
        >
          <span>{t('goToPractice')}</span>
          <IoChevronForward className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
