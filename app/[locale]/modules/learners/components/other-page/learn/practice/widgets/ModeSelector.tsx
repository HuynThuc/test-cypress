'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Icons } from '@/shared/components/Icon/icons';
import { useScreenSize } from '@/shared/hook';

import { PracticeLevels } from '@/modules/learners/constants/video-detail';
import { RootState } from '@/modules/learners/store';
import { setLevelIdx } from '@/modules/learners/store/slice/video-detail';

export const ModeSelector = () => {
  const { levelIdx } = useSelector((state: RootState) => state.practiceStage);
  const dispatch = useDispatch();
  const { md, xl } = useScreenSize();
  return (
    <div
      id="levelQuestion-step"
      className="border border-primary rounded-md xl:px-2 py-1 flex xl:gap-1 items-center text-primary"
    >
      <div className="flex items-center justify-center">
        <Icons.caretLeft
          width={xl ? 22 : md ? 20 : 22}
          height={xl ? 24 : md ? 22 : 24}
          className="cursor-pointer"
          onClick={() => dispatch(setLevelIdx((levelIdx - 1 + 3) % 3))}
        />
      </div>
      <span className="lg:text-label-large md:text-[13px] text-label-large lg:w-[96px] md:w-[92px] w-[96px] text-center">
        {PracticeLevels[levelIdx]}
      </span>
      <div className="flex items-center justify-center">
        <Icons.caretRight
          width={xl ? 24 : md ? 22 : 24}
          height={xl ? 24 : md ? 22 : 24}
          className="cursor-pointer"
          onClick={() => dispatch(setLevelIdx((levelIdx + 1) % 3))}
        />
      </div>
    </div>
  );
};
