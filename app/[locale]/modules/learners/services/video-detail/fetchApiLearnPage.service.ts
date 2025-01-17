import { LoginResponse } from '@/modules/helenngolang/types';
import {
  getAllSubtitleOfVideoDetail,
  videoQuizService,
} from '@/modules/learners/services/video-detail';
import { wordService } from '@/modules/learners/services/video-detail/Words.service';
import {
  IGetSubtitlesOfVideoDetailResponse,
  IGetVideoQuizResponse,
  IGetVideoWordsResponse,
} from '@/modules/learners/types/video-detail/VideoDetail.types';

/**
 * Fetches video data for learners.
 *
 * @param session - The login session information. Must be provided.
 * @returns A promise that resolves with the results of the video data fetch operations.
 * @throws Will throw an error if the session is not provided.
 */
export async function fetchVideosDetailData(
  session: LoginResponse | null,
  videoId: string,
  p: string = '',
) {
  const promises: Promise<
    | IGetSubtitlesOfVideoDetailResponse
    | IGetVideoWordsResponse
    | IGetVideoQuizResponse
  >[] = [];
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  promises.push(getAllSubtitleOfVideoDetail(videoId, p));
  promises.push(wordService.fetchServerWords(youtubeUrl, false));

  if (session) {
    promises.push(videoQuizService.getVideoEasyQuizs(youtubeUrl));
    promises.push(videoQuizService.getVideoMediumQuizs(youtubeUrl));
  }
  // Fetch video learners data and handle multiple API calls if needed
  return await Promise.allSettled(promises);
}
