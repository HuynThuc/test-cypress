import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  errorCode: string | null;
}

const initialState: ErrorState = {
  errorCode: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.errorCode = action.payload;
    },
    clearError: (state) => {
      state.errorCode = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
