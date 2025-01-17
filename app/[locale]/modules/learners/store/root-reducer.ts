import { combineReducers } from '@reduxjs/toolkit';

import errorReducer from '@/modules/learners/store/slice/errorSlice';
import loginSlice from '@/modules/learners/store/slice/sessionSlice';
import videoContinueSlice from '@/modules/learners/store/slice/videoContinueSlice';
import collapsedSidenavSlice from '@/modules/learners/store/slice/collapsedSidenavSlice';
import languageSlice from '@/modules/learners/store/slice/languageSlice';
import localeSlice from '@/modules/learners/store/slice/localeSlice';
import supportLanguageSlice from '@/modules/learners/store/slice/supportLanguageSlice';
import youtubePlayerSlice from '@/modules/learners/store/slice/video-detail/youtubePlayerSlice';
import learningStageReducer from '@/modules/learners/store/slice/video-detail/learningStageSlice';
import practiceStageSlice from '@/modules/learners/store/slice/video-detail/practiceStageSlice';
import videoCategorySlice from '@/modules/learners/store/slice/videoCategorySlice';
import colorSlice from '@/modules/learners/store/slice/colorSlice';
import pricingDialogReducer from '@/modules/learners/store/slice/pricing/pricingDialogSlice';
import popupVocabSlice from '@/modules/learners/store/slice/popupVocabSlice';
import tokenRefreshIntervalSlice from '@/modules/learners/store/slice/tokenRefreshIntervalSlice';

const rootReducer = combineReducers({
  error: errorReducer,
  locale: localeSlice,
  language: languageSlice,
  supportLanguages: supportLanguageSlice,
  collapsedSidenav: collapsedSidenavSlice,
  session: loginSlice,
  videoContinue: videoContinueSlice,
  videoCategory: videoCategorySlice,
  youtubePlayer: youtubePlayerSlice,
  learningStage: learningStageReducer,
  practiceStage: practiceStageSlice,
  color: colorSlice,
  pricingDialog: pricingDialogReducer,
  popupVocab: popupVocabSlice,
  tokenRefreshIntervalSlice: tokenRefreshIntervalSlice,
});

export default rootReducer;
