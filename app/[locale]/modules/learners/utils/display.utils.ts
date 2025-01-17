export const formatViewCount = (viewCount: number) => {
  if (viewCount >= Math.pow(10, 9)) {
    return `${Math.floor((viewCount / Math.pow(10, 9)) * 10) / 10}B`;
  } else if (viewCount >= Math.pow(10, 6)) {
    return `${Math.floor((viewCount / Math.pow(10, 6)) * 10) / 10}M`;
  } else if (viewCount >= Math.pow(10, 3)) {
    return `${Math.floor((viewCount / Math.pow(10, 3)) * 10) / 10}K`;
  }
  return viewCount.toString();
};
