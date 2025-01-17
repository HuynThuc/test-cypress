/* eslint-disable no-unused-vars */
import React from 'react';
import { Check } from 'lucide-react';

import { cn, LanguageToString } from '@/shared/utils';

import { stages } from '@/modules/learners/constants/video-detail/StageDefinition';

interface StageListProps {
  currentStageIndex: number;
  stageCompletion: Record<string, boolean>;
  handleStageClick: (index: number) => void;
}

export const StageList: React.FC<StageListProps> = ({
  currentStageIndex,
  stageCompletion,
  handleStageClick,
}) => (
  <div
    className={`grid grid-cols-${stages.length} md:mb-2 mb-[3px] md:min-h-[38px] min-h-[30px] rounded-md border border-border/30`}
  >
    {stages.map((stage, index) => {
      const isCompleted = stageCompletion[stage.id];
      const isActive = index === currentStageIndex; // Only the exact active stage
      const isLastStage = index === stages.length - 1;

      return (
        <div
          id={stage.id + '-step'}
          key={stage.id}
          className={cn(
            'items-center w-full h-full text-sm font-semibold cursor-pointer transition-colors duration-300 relative',
            isActive
              ? 'bg-primary text-text-onPrimary'
              : 'bg-[#f7f7f9] text-border',
            index === 0 && 'rounded-l-md',
            isLastStage && 'rounded-r-md',
          )}
          onClick={() => handleStageClick(index)}
        >
          <div className="flex items-center h-full w-full justify-center">
            <div
              className={cn(
                'lg:w-6 lg:h-6 md:w-4 md:h-4 w-4 h-4 rounded-full flex items-center justify-center mr-2 transition-colors duration-300 md:ml-3',
                isActive
                  ? 'bg-text-onPrimary text-primary'
                  : 'bg-gray-400 text-text-onPrimary',
              )}
            >
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span className="md:text-[12px] xl:text-[14px]">
              {LanguageToString(stage.display)}
            </span>
          </div>

          {/* Arrow for connecting stages */}
          {!isLastStage && (
            <div
              className={`absolute z-[1] lg:right-[-11.5px] md:right-[-7.5px] right-[-7px] top-0 h-full lg:w-3 w-2 transition-colors duration-300 ${isActive ? 'bg-primary' : 'bg-[#f7f7f9] text-border'}`}
              style={{
                clipPath: 'polygon(0 0, 100% 50%, 0 100%)',
              }}
            />
          )}
        </div>
      );
    })}
  </div>
);
