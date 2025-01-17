/* eslint-disable no-unused-vars */
import { PiSpeakerHigh, PiSpeakerSlash } from 'react-icons/pi';

import {
  Slider,
  Separator,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
} from '@/shared/components';
import { formatTime } from '@/shared/utils/Format.utils';

interface TimeVolumeControlsProps {
  sliderPosition: number;
  duration: number;
  volume: number;
  onVolumeChange: (volume: number) => void;
  isVolumePopoverOpen: boolean;
  setIsVolumePopoverOpen: (open: boolean) => void;
}

export default function TimeVolumeControls({
  sliderPosition,
  duration,
  volume,
  onVolumeChange,
  isVolumePopoverOpen,
  setIsVolumePopoverOpen,
}: TimeVolumeControlsProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-[2px]">
        <span className="text-[12px] w-12 text-right">
          {formatTime((sliderPosition / 100) * duration * 1000)}
        </span>
        <span className="text-sm">/</span>
        <span className="text-[12px] w-12 text-left">
          {formatTime(duration * 1000)}
        </span>
      </div>
      <Separator className="h-4 hidden lg:block" orientation="vertical" />
      <div className="hidden lg:block">
        <Popover
          open={isVolumePopoverOpen}
          onOpenChange={setIsVolumePopoverOpen}
        >
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onDoubleClick={() => onVolumeChange(volume === 0 ? 50 : 0)}
            >
              {volume === 0 ? (
                <PiSpeakerSlash className="w-6 h-6" />
              ) : (
                <PiSpeakerHigh className="w-6 h-6" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40">
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={(value) => onVolumeChange(value[0])}
              className="w-full"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
