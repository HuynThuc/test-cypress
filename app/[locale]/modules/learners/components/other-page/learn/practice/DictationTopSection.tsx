'use client';

import React from 'react';

import {
  ButtonChangePlaybackRate,
  ButtonChangeRepeat,
  ButtonPlaySub,
  NextPrevWithIndex,
} from '@/modules/learners/components/other-page/learn/practice/widgets';

export const DictationTopSection = React.memo(
  ({ totalSentences }: { totalSentences: number }) => {
    return (
      <div className="flex justify-between">
        <div className="flex gap-4">
          <ButtonPlaySub />
          <ButtonChangePlaybackRate />
          <ButtonChangeRepeat />
        </div>
        <NextPrevWithIndex totalSentences={totalSentences} />
      </div>
    );
  },
);
