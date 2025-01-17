import { Dispatch } from 'redux';
import { YouTubePlayer } from 'react-youtube';

import { setPlaying } from '@/modules/learners/store/slice';

export const handleKeyDownVideoPlayer = (
  event: KeyboardEvent,
  playerRef: React.RefObject<YouTubePlayer | null>,
  isPlaying: boolean,
  dispatch: Dispatch,
) => {
  if (event.code === 'Space') {
    event.preventDefault(); // Prevent the page from scrolling when Space is pressed

    if (playerRef.current) {
      if (isPlaying) {
        dispatch(setPlaying(false));
        playerRef.current.pauseVideo(); // Pause the video
      } else {
        dispatch(setPlaying(true));
        playerRef.current.playVideo(); // Play the video
      }
    }
  }
};
