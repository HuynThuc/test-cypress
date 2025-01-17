/* eslint-disable no-unused-vars */
'use client';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentSubtitleIdx } from '@/modules/learners/store/slice/video-detail';
import { RootState } from '@/modules/learners/store';
import SliderControl from '@/modules/learners/components/other-page/learn/video-controller/widget/SliderControl';
import SubtitleDisplay from '@/modules/learners/components/other-page/learn/video-controller/widget/SubtitleDisplay';
import TimeVolumeControls from '@/modules/learners/components/other-page/learn/video-controller/widget/TimeVolumeControls';
import PlaybackControls from '@/modules/learners/components/other-page/learn/video-controller/widget/PlaybackControls';
import SettingsControl from '@/modules/learners/components/other-page/learn/video-controller/widget/SettingsControl';

interface VideoControllerProps {
  onPlay: () => void;
  onPause: () => void;
  onVolumeChange: (volume: number) => void;
  onPlaybackRateChange: (rate: number) => void;
  onSeek: (time: number) => void;
  onPreviousSubtitle: () => void;
  onNextSubtitle: () => void;
}

export default function VideoController({
  onPlay,
  onPause,
  onVolumeChange,
  onPlaybackRateChange,
  onSeek,
  onPreviousSubtitle,
  onNextSubtitle,
}: VideoControllerProps) {
  const { isPlaying, currentTime, duration, volume, playbackRate, subtitles } =
    useSelector((state: RootState) => state.youtubePlayer);
  const { currentStageIndex } = useSelector(
    (state: RootState) => state.learningStage,
  );
  const dispatch = useDispatch();

  const controllerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(
    (currentTime / duration) * 100 || 0,
  );
  const [isDragging, setIsDragging] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [isVolumePopoverOpen, setIsVolumePopoverOpen] = useState(false);
  const [parentHeight, setParentHeight] = useState(0);

  useEffect(() => {
    const updateParentHeight = () =>
      setParentHeight(controllerRef.current?.clientHeight || 0);
    const observer = new ResizeObserver(updateParentHeight);
    observer.observe(controllerRef.current!);
    window.addEventListener('resize', updateParentHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateParentHeight);
    };
  }, []);

  useEffect(() => {
    if (!isDragging) setSliderPosition((currentTime / duration) * 100 || 0);
  }, [currentTime, duration, isDragging]);

  useEffect(() => {
    const currentTimeMs = Math.round(currentTime * 1000);
    const activeSubtitle = subtitles?.find((subtitle, index) => {
      const isCurrent =
        currentTimeMs >= subtitle.startTime && currentTimeMs < subtitle.endTime;
      const isNext =
        index < subtitles.length - 1 &&
        currentTimeMs >= subtitle.endTime &&
        currentTimeMs < subtitles[index + 1].startTime;
      if (isCurrent || isNext) {
        dispatch(setCurrentSubtitleIdx(isCurrent ? index : index + 1));
        return true;
      }
      return false;
    });
    setCurrentSubtitle(activeSubtitle?.text || subtitles?.[0]?.text || '');
  }, [currentTime, subtitles]);

  return (
    <div
      ref={controllerRef}
      className="flex flex-col bg-surface rounded-b text-icon md:h-1/4 xs:h-[80px] justify-between md:min-h-[128px] md:max-h-[183px]"
    >
      <SliderControl
        sliderPosition={sliderPosition}
        duration={duration}
        setSliderPosition={setSliderPosition}
        onSeek={onSeek}
        setIsDragging={setIsDragging}
      />
      <SubtitleDisplay
        currentSubtitle={currentSubtitle}
        parentHeight={parentHeight}
      />
      <div className="flex flex-row items-center justify-between md:p-2 relative">
        <TimeVolumeControls
          sliderPosition={sliderPosition}
          duration={duration}
          volume={volume}
          onVolumeChange={onVolumeChange}
          isVolumePopoverOpen={isVolumePopoverOpen}
          setIsVolumePopoverOpen={setIsVolumePopoverOpen}
        />
        {currentStageIndex !== 1 && (
          <PlaybackControls
            isPlaying={isPlaying}
            onPlay={onPlay}
            onPause={onPause}
            onPreviousSubtitle={onPreviousSubtitle}
            onNextSubtitle={onNextSubtitle}
          />
        )}
        <SettingsControl
          playbackRate={playbackRate}
          volume={volume}
          onVolumeChange={onVolumeChange}
          onPlaybackRateChange={onPlaybackRateChange}
        />
      </div>
    </div>
  );
}
