import React from 'react';

import { stages } from '@/modules/learners/constants/video-detail/StageDefinition';
import {
  IListVideoWords,
  IPracticeQuiz,
} from '@/modules/learners/types/video-detail/VideoDetail.types';

interface StageContentProps {
  currentStageIndex: number;
  wordData: IListVideoWords[];
  wordDataError: string | null;
  easyData: IPracticeQuiz[];
  easyDataError: string | null;
  mediumData: IPracticeQuiz[];
  mediumDataError: string | null;
}

export const StageContent: React.FC<StageContentProps> = ({
  currentStageIndex,
  wordData,
  wordDataError,
  easyData,
  easyDataError,
  mediumData,
  mediumDataError,
}) => {
  const currentStage = stages[currentStageIndex];
  if (!currentStage) return <div>No stage content available</div>;
  const CurrentStageComponent = currentStage.component;
  return currentStageIndex === 0 ? (
    <CurrentStageComponent wordData={wordData} wordDataError={wordDataError} />
  ) : (
    <CurrentStageComponent
      easyData={easyData}
      easyDataError={easyDataError}
      mediumData={mediumData}
      mediumDataError={mediumDataError}
    />
  );
};
