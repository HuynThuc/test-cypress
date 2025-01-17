import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenRefreshIntervalState {
  intervalInMilliseconds: number; // The interval between token refreshes, in milliseconds
}

const initialState: TokenRefreshIntervalState = {
  intervalInMilliseconds: 1000 * 60, // Default time is 1 minute (1000 * 60 milliseconds)
};

const tokenRefreshIntervalSlice = createSlice({
  name: 'tokenRefreshInterval', // The slice name has been changed to reflect its purpose
  initialState,
  reducers: {
    setTokenRefreshInterval: (state, action: PayloadAction<number>) => {
      state.intervalInMilliseconds = action.payload; // Update the token refresh interval
    },
  },
});

export const { setTokenRefreshInterval } = tokenRefreshIntervalSlice.actions;
export default tokenRefreshIntervalSlice.reducer;
