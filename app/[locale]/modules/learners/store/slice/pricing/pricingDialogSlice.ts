import { createSlice } from '@reduxjs/toolkit';

interface PricingDialogState {
  isDialogOpen: boolean;
}

const initialState: PricingDialogState = {
  isDialogOpen: false,
};

const pricingDialogSlice = createSlice({
  name: 'pricingDialog',
  initialState,
  reducers: {
    openDialog: (state) => {
      state.isDialogOpen = true;
    },
    closeDialog: (state) => {
      state.isDialogOpen = false;
    },
  },
});

export const { openDialog, closeDialog } = pricingDialogSlice.actions;

export default pricingDialogSlice.reducer;
