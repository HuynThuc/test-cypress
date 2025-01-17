import { createSlice } from '@reduxjs/toolkit';

interface PopupState {
  open: boolean;
}

const initialState: PopupState = {
  open: true,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopupVocab: (state) => {
      state.open = true;
    },
    closePopupVocab: (state) => {
      state.open = false;
    },
    togglePopupVocab: (state) => {
      state.open = !state.open;
    },
  },
});

export const { openPopupVocab, closePopupVocab, togglePopupVocab } =
  popupSlice.actions;

export default popupSlice.reducer;
