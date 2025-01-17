import ReactPlayer from 'react-player';

import { Sub } from '../types';

export const handleSpaceKey = (
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setPlaying((prev) => !prev);
};

export const handleArrowRightKey = (
  setSubIdx: React.Dispatch<React.SetStateAction<number>>,
  listSubtitles: Sub[],
  playerRef: React.RefObject<ReactPlayer>,
) => {
  setSubIdx((prev) => {
    const newIdx = Math.min(prev + 1, listSubtitles.length - 1);
    playerRef.current?.seekTo(
      listSubtitles[newIdx].startTime / 1000,
      'seconds',
    );
    // playerRef.current?.getInternalPlayer().playVideo();
    return newIdx; // return the new index
  });
};

export const handleArrowLeftKey = (
  setSubIdx: React.Dispatch<React.SetStateAction<number>>,
  listSubtitles: Sub[],
  playerRef: React.RefObject<ReactPlayer>,
) => {
  setSubIdx((prev) => {
    const newIdx = Math.max(prev - 1, 0);
    playerRef.current?.seekTo(
      listSubtitles[newIdx].startTime / 1000,
      'seconds',
    );
    // playerRef.current?.getInternalPlayer().playVideo();
    return newIdx; // return the new index
  });
};
