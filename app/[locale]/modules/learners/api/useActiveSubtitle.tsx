import { useEffect, useState } from 'react';

import { ISubtitle } from '@/modules/learners/types/video-detail/VideoDetail.types';

const SYNC_OFFSET = 100;
const LOOKAHEAD_TIME = 700;
const MAX_SUBTITLE_DURATION = 5000;
const TRANSITION_THRESHOLD_BASE = 0.7;

export function useActiveSubtitle(
  subtitles: ISubtitle[] = [], // Set default value to an empty array
  currentTime: number,
  playbackRate: number,
) {
  const [activeSubtitleIndex, setActiveSubtitleIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (!Array.isArray(subtitles) || subtitles.length === 0) {
      // If subtitles is not an array or is an empty array, exit the effect
      setActiveSubtitleIndex(null);
      return;
    }

    if (activeSubtitleIndex === null) {
      // Set the first subtitle when activeSubtitleIndex is null and there is data in subtitles
      setActiveSubtitleIndex(0);
      return;
    }

    const dynamicOffset = SYNC_OFFSET / playbackRate;
    const currentTimeMs = Math.round(currentTime * 1000) + dynamicOffset;
    const dynamicLookahead = LOOKAHEAD_TIME / playbackRate;

    let newActiveIndex = subtitles.findIndex((subtitle, index) => {
      if (
        currentTimeMs >= subtitle.startTime &&
        currentTimeMs < subtitle.endTime
      ) {
        if (subtitle.duration > MAX_SUBTITLE_DURATION) {
          const progress =
            (currentTimeMs - subtitle.startTime) / subtitle.duration;
          const transitionThreshold = Math.min(
            1,
            TRANSITION_THRESHOLD_BASE +
              (subtitle.duration / MAX_SUBTITLE_DURATION) * 0.3,
          );
          if (progress > transitionThreshold && index < subtitles.length - 1) {
            const nextSubtitle = subtitles[index + 1];
            return currentTimeMs >= nextSubtitle.startTime - dynamicLookahead;
          }
        }
        return true;
      }

      // Handle the gap between subtitles
      if (index < subtitles.length - 1) {
        const nextSubtitle = subtitles[index + 1];
        if (
          currentTimeMs >= subtitle.endTime &&
          currentTimeMs < nextSubtitle.startTime
        ) {
          return nextSubtitle.startTime - currentTimeMs <= dynamicLookahead;
        }
      }

      return false;
    });

    // Handle the last subtitle if no suitable subtitle is found
    if (
      newActiveIndex === -1 &&
      currentTimeMs >= subtitles[subtitles.length - 1].endTime
    ) {
      newActiveIndex = subtitles.length - 1;
    }

    // Update activeSubtitleIndex if there is a change
    if (newActiveIndex !== -1 && newActiveIndex !== activeSubtitleIndex) {
      setActiveSubtitleIndex(newActiveIndex);
    }
  }, [currentTime, subtitles, activeSubtitleIndex, playbackRate]);

  return activeSubtitleIndex;
}
