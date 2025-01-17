/* eslint-disable no-unused-vars */
import { LoginResponse } from '@/modules/helenngolang/types';
import {
  videoLearnersService,
  videoCategoryService,
  streakService,
} from '@/modules/learners/services/landing';
import {
  IGetStreakResponse,
  IGetTopChannelResponse,
  IGetVideoCategoriesResponse,
  IGetVideoLearnersResponse,
} from '@/modules/learners/types';
import { getInitialHomePageTopChannels } from '@/modules/learners/services/list-video';
/**
 * Fetches video data for learners.
 *
 * @param session - The login session information. Must be provided.
 * @returns A promise that resolves with the results of the video data fetch operations.
 * @throws Will throw an error if the session is not provided.
 */
export async function fetchVideosData(session: LoginResponse | null) {
  const promises: Promise<
    | IGetVideoLearnersResponse
    | IGetStreakResponse
    | IGetTopChannelResponse
    | IGetVideoCategoriesResponse
  >[] = [];

  // Add API calls that do not require session
  promises.push(videoLearnersService.getVideoLearners());
  promises.push(videoCategoryService.getAllVideoCategories());
  promises.push(getInitialHomePageTopChannels());

  // Only call APIs that require session if session exists
  if (session) {
    promises.push(
      // Example: Add another API that requires session
      streakService.getStreakUser(),
    );
  }
  // Fetch video learners data and handle multiple API calls if needed
  return await Promise.allSettled(promises);
}
