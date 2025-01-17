import React from 'react';

import { Button } from '@/shared/components';

interface LearningStagesDropdownProps {
  stages: { id: string }[];
  currentStage: string;
  stageStatus: Record<string, string>;
  // eslint-disable-next-line no-unused-vars
  onStageChange: (stage: string) => void;
}

export const StagesDropdown: React.FC<LearningStagesDropdownProps> = ({
  stages,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  currentStage,
  stageStatus,
  onStageChange,
}) => (
  <div>
    {stages.map((stage) => (
      <Button
        key={stage.id}
        onClick={() => onStageChange(stage.id)}
        disabled={stageStatus[stage.id] === 'notVisited'}
      >
        {stage.id}
      </Button>
    ))}
  </div>
);
