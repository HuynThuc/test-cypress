import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColorState {
  primaryColor: string;
}

const initialState: ColorState = {
  primaryColor: '',
};

const colorSlice = createSlice({
  name: 'color',
  initialState,
  reducers: {
    setPrimaryColor(state, action: PayloadAction<string>) {
      state.primaryColor = action.payload;
    },
  },
});

// Export action và reducer
export const { setPrimaryColor } = colorSlice.actions;
export default colorSlice.reducer;
