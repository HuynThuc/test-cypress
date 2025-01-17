import { createSlice } from '@reduxjs/toolkit';

export const localeSlice = createSlice({
  name: 'locale',
  initialState: {
    currentLocale: 'en',
  },
  reducers: {
    setLocale: (state, action) => {
      state.currentLocale = action.payload;
    },
    clearLocale: (state) => {
      state.currentLocale = 'en';
    },
  },
});

export const { setLocale, clearLocale } = localeSlice.actions;
export default localeSlice.reducer;
