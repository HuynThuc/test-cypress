import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Icons } from '@/shared/components/Icon/icons';

import { RootState } from '@/modules/learners/store';
import { seekTo } from '@/modules/learners/store/slice';
import {
  decrementCurrentSentenceIdx,
  incrementCurrentSentenceIdx,
} from '@/modules/learners/store/slice/video-detail/practiceStageSlice';

export const NextPrevWithIndex = ({
  totalSentences,
}: {
  totalSentences: number;
}) => {
  const { subtitles } = useSelector((state: RootState) => state.youtubePlayer);
  const { currentSubtitleIdx } = useSelector(
    (state: RootState) => state.practiceStage,
  );
  const dispatch = useDispatch();
  return (
    <div className="flex gap-4 px-2 py-1">
      <button
        onClick={() => {
          dispatch(seekTo(subtitles[currentSubtitleIdx - 1].startTime / 1000));
          dispatch(decrementCurrentSentenceIdx());
        }}
        className={currentSubtitleIdx === 0 ? 'text-border/50' : 'text-primary'}
        disabled={currentSubtitleIdx === 0}
      >
        <Icons.caretLeft size={24} />
      </button>
      <span className="text-border min-w-9 w-fit text-center">
        <span className="text-primary">{currentSubtitleIdx + 1}</span>/
        {totalSentences}
      </span>
      <button
        onClick={() => {
          dispatch(seekTo(subtitles[currentSubtitleIdx + 1].startTime / 1000));
          dispatch(incrementCurrentSentenceIdx());
        }}
        className={
          currentSubtitleIdx === totalSentences - 1
            ? 'text-border/50'
            : 'text-primary'
        }
        disabled={currentSubtitleIdx === totalSentences - 1}
      >
        <Icons.caretRight size={24} />
      </button>
    </div>
  );
};
