/* eslint-disable no-unused-vars */
import React from 'react';
import { Volume2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { AiOutlineCheck, AiOutlineCloseCircle } from 'react-icons/ai';
import { MdOutlineInventory } from 'react-icons/md';

import { Button, ScrollArea } from '@/shared/components';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/shared/components/shacdn-ui/Card';

import type { IListVideoWords } from '@/modules/learners/types/video-detail/VideoDetail.types';

interface CardItemProps {
  item: IListVideoWords;
  gotIt: number;
  needReview: number;
  total: number;
  playAudio: (url: string) => void;
}

export default function CardItem({
  item,
  gotIt,
  needReview,
  total,
  playAudio,
}: CardItemProps) {
  const t = useTranslations('Learn');
  return (
    item.word &&
    item.word.definitions.length > 0 && (
      <div className="flex flex-col items-center justify-center w-full h-full p-2">
        <Card
          className="md:w-3/4 w-full h-[calc(45vh-10px)] md:h-[calc(60vh-20px)] md:max-h-[590px]
      md:min-h-[327px] md:min-w-[363px] md:max-w-[450px]
      shadow-e3 border-none overflow-hidden flex flex-col"
        >
          {/* Header section */}
          <CardHeader className="flex-row w-full justify-between items-center p-2 space-y-0 md:h-[56px] h-[38px]">
            <div className="flex flex-row justify-between items-center md:p-4 p-2 md:mb-4 mb-2 w-full h-full">
              <div className="flex flex-row gap-1 h-full items-center">
                <div className="gradient-green-background text-white rounded-full w-4 h-4">
                  <AiOutlineCheck color="currentColor" className="" />
                </div>
                <span className="text-[10px] font-medium gradient-green-text">
                  {t('know')}: {gotIt}
                </span>
              </div>
              <div className="flex flex-row gap-1 h-4 items-center">
                <div className="gradient-red-background text-white rounded-full w-4 h-4">
                  <AiOutlineCloseCircle color="currentColor" />
                </div>
                <span className="text-[10px] font-medium gradient-red-text">
                  {t('reviewneeded')}: {needReview}
                </span>
              </div>
              <div className="flex flex-row gap-1 h-4 items-center">
                <div className="gradient-blue-background text-white rounded-full w-4 h-4">
                  <MdOutlineInventory color="currentColor" />
                </div>
                <span className="text-[10px] font-medium gradient-blue-text">
                  {t('total')}: {total}
                </span>
              </div>
            </div>
          </CardHeader>
          {/* Word content */}
          <CardContent className="p-0 md:p-6 flex flex-col items-center justify-between md:gap-4 h-full overflow-hidden">
            <h2 className="text-3xl font-bold text-center">{item.word.word}</h2>
            <div className="flex flex-col items-center md:space-y-2 md:mb-4 mx-2">
              <div className="flex items-center">
                <span className="text-sm mr-2">UK</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary p-0"
                  onClick={() =>
                    playAudio(item.word.definitions[0].pronunciationUKMp3)
                  }
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
                <span className="text-sm ml-2">
                  /{item.word.definitions[0].pronunciationUK}/
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-2">US</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary p-0"
                  onClick={() =>
                    playAudio(item.word.definitions[0].pronunciationUSMp3)
                  }
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
                <span className="text-sm ml-2">
                  /{item.word.definitions[0].pronunciationUS}/
                </span>
              </div>
            </div>
            <ScrollArea className="h-full w-full px-3">
              {item.word.definitions.map((def, defIndex) => (
                <div key={defIndex} className="mb-2">
                  <span className="text-xs px-2 py-1 rounded bg-primary text-text-onPrimary">
                    {def.posFullName}
                  </span>
                  <p className="mt-1 text-sm">{def.englishDefinition}</p>
                </div>
              ))}
            </ScrollArea>
            {/* </div> */}
          </CardContent>
        </Card>
      </div>
    )
  );
}
