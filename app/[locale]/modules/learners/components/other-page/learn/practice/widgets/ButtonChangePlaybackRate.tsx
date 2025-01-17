import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/shacdn-ui';

import { RootState } from '@/modules/learners/store';
import { setPlaybackRate } from '@/modules/learners/store/slice';
import { PlaybackRates } from '@/modules/learners/constants/video-detail';

export const ButtonChangePlaybackRate = () => {
  const { playbackRate } = useSelector(
    (state: RootState) => state.youtubePlayer,
  );
  const dispatch = useDispatch();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="text-primary border-primary rounded-lg px-3 py-1.5 h-auto hover:bg-primary hover:text-surface"
        >
          <span className="text-label-medium w-8">{playbackRate}x</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 px-1 pb-1 pt-2 bg-surface border-border/50">
        <p className="text-xs text-border font-semibold px-1 text-center mb-2">
          Playback speed:
        </p>
        <div className="flex flex-col gap-1">
          {PlaybackRates.map((rate) => (
            <Button
              key={rate}
              size="sm"
              onClick={() => dispatch(setPlaybackRate(rate))}
              className={
                playbackRate === rate
                  ? 'text-text-onPrimary bg-primary rounded'
                  : 'hover:bg-border/10 bg-surface shadow-none'
              }
            >
              {rate}x
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
