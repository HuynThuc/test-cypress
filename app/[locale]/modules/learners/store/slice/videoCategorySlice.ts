import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IVideoCategory } from '@/modules/learners/types';

interface CategoryVideoState {
  categories: IVideoCategory[];
  activeCategory: string;
}

const initialState: CategoryVideoState = {
  categories: [],
  activeCategory: 'for-you',
};

const categoryVideoSlice = createSlice({
  name: 'videoCategory',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<IVideoCategory[]>) {
      state.categories = action.payload;
    },
    setActiveCategory(state, action: PayloadAction<string>) {
      state.activeCategory = action.payload;
    },
  },
});

export const { setCategories, setActiveCategory } = categoryVideoSlice.actions;

export default categoryVideoSlice.reducer;
