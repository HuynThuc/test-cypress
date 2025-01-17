import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILanguageCountry } from '@/modules/learners/types';

interface LanguagesState {
  languages: ILanguageCountry[];
  loading: boolean;
  error: string | null;
}

const initialState: LanguagesState = {
  languages: [],
  loading: false,
  error: null,
};

const supportLanguageSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    fetchLanguagesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLanguagesSuccess(state, action: PayloadAction<ILanguageCountry[]>) {
      state.languages = action.payload;
      state.loading = false;
    },
    fetchLanguagesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchLanguagesStart,
  fetchLanguagesSuccess,
  fetchLanguagesFailure,
} = supportLanguageSlice.actions;
export default supportLanguageSlice.reducer;
