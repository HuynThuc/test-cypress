import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoginResponse } from '@/modules/helenngolang/types';

interface LoginState {
  data: LoginResponse | null;
}

const initialState: LoginState = {
  data: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginResponse(state, action: PayloadAction<LoginResponse>) {
      state.data = action.payload;
    },
    clearLoginResponse(state) {
      state.data = null;
    },
  },
});

export const { setLoginResponse, clearLoginResponse } = loginSlice.actions;

export default loginSlice.reducer;
