import React from 'react';
import { Volume2 } from 'lucide-react';

import { Button, Checkbox } from '@/shared/components';
import { cn } from '@/shared/utils';

import { DefinitionList } from '@/modules/learners/components/other-page/learn/vocabulary/overview/DefinitionList';
import { playAudio } from '@/modules/learners/utils';

interface WordCardProps {
  word: {
    word: string;
    definitions: Array<{
      posFullName: string;
      englishDefinition: string;
      pronunciationUKMp3: string;
      pronunciationUSMp3: string;
    }>;
  };
  isSelected: boolean;
  proficiencyLevel: number;
  onSelect: () => void;
}

export function WordCard({
  word,
  isSelected,
  proficiencyLevel,
  onSelect,
}: WordCardProps) {
  if (!word || word.definitions.length === 0) return null;

  const primaryDefinition = word.definitions[0];

  return (
    <div>
      <div
        className={cn(
          'border rounded-lg p-4 space-y-3 cursor-pointer',
          isSelected ? 'border-primary' : '',
          proficiencyLevel >= 1 ? 'bg-primary/10 border-primary' : '',
        )}
      >
        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg">{word.word || ''}</span>
          <Checkbox
            checked={isSelected}
            className="rounded-full data-[state=checked]:bg-primary data-[state=checked]:text-text-onPrimary"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs px-2 py-1 rounded bg-primary text-text-onPrimary">
            {primaryDefinition.posFullName}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary"
            onClick={(e) => {
              e.stopPropagation();
              playAudio(primaryDefinition.pronunciationUKMp3);
            }}
          >
            <Volume2 className="h-4 w-4 mr-1" />
            <span className="text-xs">UK</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary"
            onClick={(e) => {
              e.stopPropagation();
              playAudio(primaryDefinition.pronunciationUSMp3);
            }}
          >
            <Volume2 className="h-4 w-4 mr-1" />
            <span className="text-xs">US</span>
          </Button>
        </div>
        <DefinitionList
          primaryDefinition={primaryDefinition}
          additionalDefinitions={word.definitions.slice(1)}
          playAudio={playAudio}
        />
      </div>
    </div>
  );
}
