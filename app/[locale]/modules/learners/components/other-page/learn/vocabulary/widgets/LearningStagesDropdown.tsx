/* eslint-disable no-unused-vars */
import React from 'react';
import { Check, Circle, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { cn, LanguageToString } from '@/shared/utils';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components';

import {
  VocabularyStage,
  StageId,
  StageStatus,
  vocabularyStages,
} from '@/modules/learners/constants/video-detail/vocabulary/VocabularyStageDefinition';
import { RootState } from '@/modules/learners/store';
import {
  closePopupVocab,
  togglePopupVocab,
} from '@/modules/learners/store/slice';

interface LearningStagesDropdownProps {
  stages: VocabularyStage[];
  currentStage: StageId;
  stageStatus: Record<StageId, StageStatus>;
  onStageChange: (stage: StageId) => void;
}

export function LearningStagesDropdown({
  stages,
  currentStage,
  stageStatus,
  onStageChange,
}: LearningStagesDropdownProps) {
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);
  const openDropdown = useSelector((state: RootState) => state.popupVocab.open);
  // Get the current stage information once, avoid calling multiple times.
  const currentStageData = stages.find((stage) => stage.id === currentStage);

  const StatusIndicator = ({ status }: { status: StageStatus }) => {
    const statusIcons = {
      completed: (
        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
          <Check className="h-4 w-4 text-text-onPrimary" />
        </div>
      ),
      inProgress: (
        <div className="w-5 h-5 border-2 border-primary rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-primary rounded-full" />
        </div>
      ),
      notDone: <Circle className="h-5 w-5 text-red-500" />,
      notVisited: <Circle className="h-5 w-5 text-muted-foreground" />,
    };

    return statusIcons[status] || statusIcons.notVisited;
  };

  const isVocabularyStage = currentStage === vocabularyStages[0].id;
  const canChangeStage = (stageId: StageId) =>
    (!isVocabularyStage || stageId === vocabularyStages[0].id) &&
    (stageStatus.overView === 'completed' ||
      (stageStatus[stageId] !== 'notVisited' &&
        stageStatus[stageId] !== 'notDone'));

  const togglePopover = () => {
    dispatch(togglePopupVocab());
  };

  return (
    <Popover open={openDropdown}>
      <PopoverTrigger asChild className="border-none">
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={openDropdown}
          className="flex gap-2 p-0"
          onClick={togglePopover}
        >
          {/* Use current stage information from the optimized variable */}
          <span className="text-primary">{currentStageData?.icon}</span>
          <span className="text-text-secondary font-bold text-[14px]">
            {currentStageData && LanguageToString(currentStageData.label)}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full h-full p-0 overflow-hidden bg-background border-none">
        <div className="shadow-e4 p-4">
          {stages.map((stage, idx) => {
            const isDisabled = !canChangeStage(stage.id);
            const textStyle = isDisabled ? 'text-border' : 'text-primary';

            return (
              <div
                key={stage.id}
                className="flex flex-col justify-center items-end"
              >
                <button
                  id={stage.id + '-step'}
                  className={cn(
                    'w-full flex items-center justify-between text-left',
                    isDisabled ? 'cursor-not-allowed' : '',
                  )}
                  onClick={() => {
                    if (!isDisabled) {
                      onStageChange(stage.id);
                      dispatch(closePopupVocab());
                    }
                  }}
                  disabled={isDisabled}
                >
                  <div className="flex items-center pr-4">
                    <span className={cn('mr-3', textStyle)}>{stage.icon}</span>
                    <span className={cn('font-medium', textStyle)}>
                      {LanguageToString(stage.label)}
                    </span>
                  </div>
                  <StatusIndicator status={stageStatus[stage.id]} />
                </button>
                {idx < stages.length - 1 && (
                  <div className="my-2 w-6 md:h-[32px] h-[20px] flex items-center justify-center">
                    <div className="bg-border w-[2px] h-full" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
