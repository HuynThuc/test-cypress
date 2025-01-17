import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IProcessedSubtitle,
  ISubtitle,
} from '@/modules/learners/types/video-detail/VideoDetail.types';
import { processSubtitles } from '@/modules/learners/utils';

interface YoutubePlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  seekTime: number | null;
  subtitles: ISubtitle[];
  processedSubtitles: IProcessedSubtitle[];
  videoId: string | null;
  repeatTime: number;
}

const initialState: YoutubePlayerState = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 100,
  playbackRate: 1,
  seekTime: null,
  subtitles: [],
  processedSubtitles: [],
  videoId: null,
  repeatTime: 3,
};

const youtubePlayerSlice = createSlice({
  name: 'youtubePlayer',
  initialState,
  reducers: {
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action ? action.payload : !state.isPlaying;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setPlaybackRate: (state, action: PayloadAction<number>) => {
      state.playbackRate = action.payload;
    },
    seekTo: (state, action: PayloadAction<number>) => {
      state.seekTime = action.payload;
    },
    clearSeekTime: (state) => {
      state.seekTime = null;
    },
    setSubtitles: (state, action: PayloadAction<ISubtitle[]>) => {
      state.subtitles = action.payload;
    },
    setProcessedSubtitles: (state, action: PayloadAction<ISubtitle[]>) => {
      state.processedSubtitles = processSubtitles(action.payload);
    },
    setVideoId: (state, action: PayloadAction<string | null>) => {
      state.videoId = action.payload;
    },
    setRepeatTime: (state, action: PayloadAction<number>) => {
      state.repeatTime = action.payload;
    },
  },
});

export const {
  setPlaying,
  setCurrentTime,
  setDuration,
  setVolume,
  setPlaybackRate,
  seekTo,
  clearSeekTime,
  setSubtitles,
  setProcessedSubtitles,
  setVideoId,
  setRepeatTime,
} = youtubePlayerSlice.actions;

export default youtubePlayerSlice.reducer;
