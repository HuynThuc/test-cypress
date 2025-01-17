/* eslint-disable no-unused-vars */
import React from 'react';
import { Volume2 } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from '@/shared/components';

interface DefinitionListProps {
  primaryDefinition: {
    posFullName: string;
    englishDefinition: string;
    pronunciationUKMp3: string;
    pronunciationUSMp3: string;
  };
  additionalDefinitions: Array<{
    posFullName: string;
    englishDefinition: string;
    pronunciationUKMp3: string;
    pronunciationUSMp3: string;
  }>;
  playAudio: (url: string) => void;
}

export function DefinitionList({
  primaryDefinition,
  additionalDefinitions,
  playAudio,
}: DefinitionListProps) {
  if (!primaryDefinition) return null;

  return additionalDefinitions.length > 0 ? (
    <div onClick={(e) => e.stopPropagation()}>
      <Accordion type="single" collapsible className="border-none">
        <AccordionItem value="additional-definitions" className="border-none">
          <AccordionTrigger className="p-0 flex flex-row items-start ">
            <p className="w-full text-sm flex flex-row items-start text-left">
              {primaryDefinition.englishDefinition || 'No definition available'}
            </p>
          </AccordionTrigger>
          <AccordionContent className="pt-3">
            {additionalDefinitions.map((def, index) => (
              <div key={index} className="mt-3 space-y-3">
                <div className="flex space-x-2">
                  <span className="text-xs px-2 py-1 rounded bg-primary text-text-onPrimary">
                    {def.posFullName || 'N/A'}
                  </span>
                  {def.pronunciationUKMp3 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(def.pronunciationUKMp3);
                      }}
                    >
                      <Volume2 className="h-4 w-4 mr-1" />
                      <span className="text-xs">UK</span>
                    </Button>
                  )}
                  {def.pronunciationUSMp3 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(def.pronunciationUSMp3);
                      }}
                    >
                      <Volume2 className="h-4 w-4 mr-1" />
                      <span className="text-xs">US</span>
                    </Button>
                  )}
                </div>
                <p className="text-sm">
                  {def.englishDefinition || 'No definition available'}
                </p>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ) : (
    <p className="text-sm">
      {primaryDefinition.englishDefinition || 'No definition available'}
    </p>
  );
}
