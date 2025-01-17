/* eslint-disable no-console */
import {
  IGetVideoContinueResponse,
  IVideoActivity,
} from '@/modules/learners/types/VideoContinue.types';

class VideoHistoryService {
  private static localStorageKey = 'videoHistory';

  // Get history from localStorage
  static getHistory(): IGetVideoContinueResponse | null {
    const storedData = localStorage.getItem(this.localStorageKey);
    if (storedData) {
      try {
        return JSON.parse(storedData) as IGetVideoContinueResponse;
      } catch (error) {
        console.error('Error parsing video history from localStorage:', error);
        return null;
      }
    }
    return null;
  }

  // Save data to localStorage
  static saveHistory(data: IGetVideoContinueResponse): void {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving video history to localStorage:', error);
    }
  }

  // Add a video to the history list
  static addVideoToHistory(
    videoActivity: IVideoActivity,
    userId: string,
  ): void {
    const history = this.getHistory();

    // If no history exists, initialize a new structure
    if (!history) {
      const newHistory: IGetVideoContinueResponse = {
        code: 200,
        data: {
          userId: userId,
          list: [videoActivity],
        },
        message: 'Video added to history.',
        success: true,
      };

      // Save history to localStorage
      this.saveHistory(newHistory);
    } else {
      if (!history.data) {
        history.data = { userId: userId, list: [] };
      }

      // Check if the video already exists in the history
      const existingVideo = history.data.list.find(
        (item: IVideoActivity) => item.video.id === videoActivity.video.id,
      );

      if (existingVideo) {
        // Update the progress and action time for the existing video
        existingVideo.progressAtSeconds = videoActivity.progressAtSeconds;
        existingVideo.actionAt = videoActivity.actionAt;
      } else {
        history.data.list.push(videoActivity);
      }

      history.data.list.sort((a, b) => {
        const dateA = new Date(a.actionAt).getTime();
        const dateB = new Date(b.actionAt).getTime();
        return dateB - dateA;
      });

      this.saveHistory(history);
    }
  }

  // Update video progress in history
  static updateVideoProgress(
    videoId: string,
    newProgress: number,
    actionAt: string,
  ): void {
    const history = this.getHistory();

    if (history && history.data) {
      const videoToUpdate = history.data?.list.find(
        (item: IVideoActivity) => item.video.id === videoId,
      );

      if (videoToUpdate) {
        videoToUpdate.progressAtSeconds = newProgress;
        videoToUpdate.actionAt = actionAt;
        this.saveHistory(history);
      } else {
        console.error('Video not found in history');
      }
    } else {
      console.error('No video history found to update');
    }
  }

  // Remove video history from localStorage
  static removeHistory(): void {
    try {
      localStorage.removeItem(this.localStorageKey);
    } catch (error) {
      console.error('Error removing video history from localStorage:', error);
    }
  }

  // Remove a specific video from history based on videoId
  static removeVideoFromHistory(videoId: string): void {
    const history = this.getHistory();

    if (history && history.data) {
      history.data.list = history.data.list.filter(
        (item: IVideoActivity) => item.video.id !== videoId,
      );

      this.saveHistory(history);
    } else {
      console.error('No history found to remove the video');
    }
  }
}

export const videosHistoryLocalService = VideoHistoryService;
