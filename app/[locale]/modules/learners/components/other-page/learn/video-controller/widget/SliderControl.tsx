/* eslint-disable no-unused-vars */
import { Dispatch, SetStateAction } from 'react';

import { Slider } from '@/shared/components';

interface SliderControlProps {
  sliderPosition: number;
  duration: number;
  setSliderPosition: Dispatch<SetStateAction<number>>;
  onSeek: (time: number) => void;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
}

export default function SliderControl({
  sliderPosition,
  duration,
  setSliderPosition,
  onSeek,
  setIsDragging,
}: SliderControlProps) {
  return (
    <Slider
      value={[sliderPosition]}
      max={100}
      step={0.1}
      onValueChange={(value) => {
        setIsDragging(true);
        setSliderPosition(value[0]);
      }}
      onValueCommit={(value) => {
        setIsDragging(false);
        onSeek((value[0] / 100) * duration);
      }}
      className="w-full h-1"
    />
  );
}
