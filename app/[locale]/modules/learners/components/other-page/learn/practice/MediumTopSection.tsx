import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Icons } from '@/shared/components/Icon/icons';
import { Button } from '@/shared/components/shacdn-ui';

import { NextPrev } from '@/modules/learners/components/other-page/learn/practice/widgets';
import { RootState } from '@/modules/learners/store';
import { seekTo, setPlaying } from '@/modules/learners/store/slice';
import { setPingActive } from '@/modules/learners/store/slice/video-detail';

export const MediumTopSection = React.memo(
  ({
    handleClear,
    totalQuestions,
    startTime,
    duration,
    disableClearChoice,
  }: {
    handleClear: () => void;
    totalQuestions: number;
    startTime: number;
    duration: number;
    disableClearChoice: boolean;
  }) => {
    const { isPlaying } = useSelector(
      (state: RootState) => state.youtubePlayer,
    );
    const { isPingActive } = useSelector(
      (state: RootState) => state.practiceStage,
    );
    const dispatch = useDispatch();
    const handleClick = () => {
      dispatch(setPingActive(false));
      if (isPlaying) {
        dispatch(setPlaying(false));
        return;
      }
      dispatch(seekTo(startTime / 1000));
      dispatch(setPlaying(true));
      const playSubTimeout =
        duration &&
        setTimeout(() => {
          dispatch(setPlaying(false));
        }, duration);
      return () => clearTimeout(playSubTimeout);
    };

    return (
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Button
            variant="default"
            size="icon"
            className="relative bg-surface h-8 w-8 text-primary rounded-full ring-2 ring-primary/25 hover:text-surface"
            onClick={handleClick}
            disabled={disableClearChoice}
          >
            {isPingActive && (
              <span className="animate-ping absolute inline-flex h-4/5 w-4/5 rounded-full bg-primary/75"></span>
            )}
            {!isPlaying ? (
              <Icons.circlePlay className="h-full w-full" />
            ) : (
              <Icons.circleStop className="h-full w-full" />
            )}
          </Button>
          <Button
            variant="outline"
            className="text-primary border-primary rounded px-4 py-2 h-fit hover:bg-primary hover:text-surface"
            onClick={handleClear}
          >
            <span className="text-label-medium">Clear Choices</span>
          </Button>
        </div>
        <NextPrev totalQuestions={totalQuestions} />
      </div>
    );
  },
);
