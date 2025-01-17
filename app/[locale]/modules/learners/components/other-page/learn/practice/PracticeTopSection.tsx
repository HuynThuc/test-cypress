import React from 'react';

import { useScreenSize } from '@/shared/hook';

import {
  ModeSelector,
  ScoreMeter,
} from '@/modules/learners/components/other-page/learn/practice/widgets';

export const PracticeTopSection = () => {
  const { md, xl } = useScreenSize();
  return (
    <div className="w-full flex justify-between h-[36px]">
      <ModeSelector />
      <ScoreMeter size={xl ? 'medium' : md ? 'small' : 'medium'} />
    </div>
  );
};
