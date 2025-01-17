import { createSlice } from '@reduxjs/toolkit';

import enMessages from '@/app/locales/en.json';
import viMessages from '@/app/locales/vi.json';
import frMessages from '@/app/locales/ja.json';
import { Locale } from '@/app/configs/appConfig';

const messages: Record<Locale, typeof enMessages> = {
  en: enMessages,
  vi: viMessages,
  ja: frMessages,
};

const initialState = {
  locale: 'en',
  messages: messages['en'],
};
const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLocale: (state, action: { payload: Locale }) => {
      const newLocale = action.payload;
      state.locale = newLocale;
      state.messages = messages[newLocale];
    },
  },
});

export const { changeLocale } = languageSlice.actions;
export default languageSlice.reducer;
