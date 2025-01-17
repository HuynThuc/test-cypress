import { PiSkipBackFill, PiSkipForwardFill } from 'react-icons/pi';
import { FaCirclePause, FaCirclePlay } from 'react-icons/fa6';

import { Button } from '@/shared/components';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onPreviousSubtitle: () => void;
  onNextSubtitle: () => void;
}

export default function PlaybackControls({
  isPlaying,
  onPlay,
  onPause,
  onPreviousSubtitle,
  onNextSubtitle,
}: PlaybackControlsProps) {
  return (
    <div className="flex items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-x-4">
      <Button variant="ghost" size="icon" onClick={onPreviousSubtitle}>
        <PiSkipBackFill className="md:w-8 md:h-8 w-6 h-6" />
      </Button>
      <div id="first-step">
        <Button
          variant="ghost"
          size="icon"
          onClick={isPlaying ? onPause : onPlay}
          className="flex items-center justify-center h-full w-full"
        >
          {isPlaying ? (
            <FaCirclePause className="md:w-8 md:h-8 w-6 h-6 text-primary" />
          ) : (
            <FaCirclePlay className="md:w-8 md:h-8 w-6 h-6 text-primary" />
          )}
        </Button>
      </div>
      <Button variant="ghost" size="icon" onClick={onNextSubtitle}>
        <PiSkipForwardFill className="md:w-8 md:h-8 w-6 h-6" />
      </Button>
    </div>
  );
}
