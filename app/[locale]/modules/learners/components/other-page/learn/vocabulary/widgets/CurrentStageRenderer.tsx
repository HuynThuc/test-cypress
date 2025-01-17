/* eslint-disable no-unused-vars */
'use client';

import React from 'react';

import { LoadingIndicator } from '@/shared/components';

import {
  StageId,
  vocabularyStages,
} from '@/modules/learners/constants/video-detail/vocabulary/VocabularyStageDefinition';
import {
  IListVideoWords,
  WordProficiencyPayload,
} from '@/modules/learners/types/video-detail/VideoDetail.types';

interface CurrentStageRendererProps {
  currentStage: StageId;
  isLoading: boolean;
  wordsData: IListVideoWords[];
  selectedWords: string[];
  // setWordData: (data: IListVideoWords[]) => void;
  onWordSelection: (word: string) => void;
  onMoveToNextStage: () => void;
  onUpdateWordProficiency: (payload: WordProficiencyPayload) => void;
}

export const CurrentStageRenderer: React.FC<CurrentStageRendererProps> = ({
  currentStage,
  isLoading,
  wordsData,
  selectedWords,
  // setWordData,
  onWordSelection,
  onMoveToNextStage,
  onUpdateWordProficiency,
}) => {
  const CurrentStageComponent = vocabularyStages.find(
    (stage) => stage.id === currentStage,
  )?.component;

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (!wordsData || !CurrentStageComponent) {
    return null;
  }

  return (
    <CurrentStageComponent
      wordsData={wordsData}
      // setWordData={setWordData}
      selectedWords={selectedWords}
      onWordSelection={onWordSelection}
      onMoveToNextStage={onMoveToNextStage}
      onUpdateWordProficiency={onUpdateWordProficiency}
    />
  );
};
