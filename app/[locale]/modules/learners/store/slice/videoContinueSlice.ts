import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  IListVideoContinue,
  IVideoActivity,
} from '@/modules/learners/types/VideoContinue.types';

// Define the initial state
interface VideosContinueState {
  userId: string;
  list: IVideoActivity[];
}

const initialState: VideosContinueState = {
  userId: '',
  list: [],
};

const videosContinueSlice = createSlice({
  name: 'videosContinue',
  initialState,
  reducers: {
    // Update the video list and userId
    setVideosContinueList: (
      state,
      action: PayloadAction<IListVideoContinue>,
    ) => {
      state.userId = action.payload.userId;
      state.list = action.payload.list;
    },
    // Clear the video list
    clearVideosContinueList: (state) => {
      state.userId = '';
      state.list = [];
    },
  },
});

// Export actions to use in components
export const { setVideosContinueList, clearVideosContinueList } =
  videosContinueSlice.actions;

// Export reducer to integrate into the store
export default videosContinueSlice.reducer;
