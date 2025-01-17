import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SideNavState {
  isCollapsed: boolean;
}

const initialState: SideNavState = {
  isCollapsed: true,
};

const sideNavSlice = createSlice({
  name: 'sideNav',
  initialState,
  reducers: {
    setIsCollapsed(state, action: PayloadAction<boolean>) {
      state.isCollapsed = action.payload;
    },
    toggleSideNav(state) {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});

export const { setIsCollapsed, toggleSideNav } = sideNavSlice.actions;
export default sideNavSlice.reducer;
