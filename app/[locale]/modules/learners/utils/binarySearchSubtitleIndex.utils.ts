import { Sub } from '../types';

export const binarySearchSubtitleIndex = (
  subtitles: Sub[],
  currentTime: number,
) => {
  let left = 0;
  let right = subtitles.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const subtitle = subtitles[mid];

    if (currentTime >= subtitle.startTime && currentTime <= subtitle.endTime) {
      return mid;
    } else if (currentTime < subtitle.startTime) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
};
