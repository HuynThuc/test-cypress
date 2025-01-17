import { useDispatch, useSelector } from 'react-redux';

import { Icons } from '@/shared/components/Icon/icons';
import { Button } from '@/shared/components/shacdn-ui';

import { RootState } from '@/modules/learners/store';
import {
  setPingActive,
  setPlayingWithRepeatTime,
} from '@/modules/learners/store/slice/video-detail';

export const ButtonPlaySub = () => {
  const { isPlayingWithRepeatTime, isPingActive } = useSelector(
    (state: RootState) => state.practiceStage,
  );
  const { isPlaying } = useSelector((state: RootState) => state.youtubePlayer);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(setPlayingWithRepeatTime(!isPlayingWithRepeatTime));
    dispatch(setPingActive(false)); // Stop animation on hover
  };

  return (
    <Button
      id="playRepeat-step"
      variant="default"
      size="icon"
      className="relative bg-surface h-8 w-8 text-primary rounded-full ring-2 ring-primary/25 hover:text-surface"
      onClick={handleButtonClick}
      disabled={isPlaying && !isPlayingWithRepeatTime}
    >
      {isPingActive && (
        <span className="animate-ping absolute inline-flex h-4/5 w-4/5 rounded-full bg-primary/75"></span>
      )}
      {!isPlayingWithRepeatTime ? (
        <Icons.circlePlay className="h-full w-full relative" />
      ) : (
        <Icons.circleStop className="h-full w-full relative" />
      )}
    </Button>
  );
};
