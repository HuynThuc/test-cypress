'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';

import { RootState } from '@/modules/learners/store';
import { seekTo } from '@/modules/learners/store/slice';
import { useActiveSubtitle } from '@/modules/learners/api';
import SubtitleList from '@/modules/learners/components/other-page/learn/transcript/widget/SubtitleList';

export default function Transcript() {
  const t = useTranslations('Learn');
  const dispatch = useDispatch();
  const {
    currentTime,
    playbackRate,
    subtitles = [],
  } = useSelector((state: RootState) => state.youtubePlayer);

  const activeSubtitleIndex = useActiveSubtitle(
    subtitles,
    currentTime,
    playbackRate,
  );

  const handleSubtitleClick = (time: number) => {
    dispatch(seekTo(time / 1000));
  };

  if (!subtitles || subtitles.length === 0)
    return <div className="bg-surface rounded-lg p-4">{t('nosubtitles')}</div>;

  return (
    <div className="w-full h-full flex flex-col md:gap-6 gap-1">
      <div className="w-full h-full md:px-4 px-1">
        <SubtitleList
          subtitles={subtitles}
          activeSubtitleIndex={activeSubtitleIndex}
          handleSubtitleClick={handleSubtitleClick}
        />
      </div>
    </div>
  );
}
