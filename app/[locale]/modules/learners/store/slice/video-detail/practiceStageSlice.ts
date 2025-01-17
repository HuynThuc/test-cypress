import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IPracticeQuizHistory } from '@/modules/learners/types/video-detail';

interface PracticeStageStates {
  currentSubtitleIdx: number;
  isPlayingWithRepeatTime: boolean;
  levelIdx: number;
  easyResult: IPracticeQuizHistory[];
  mediumResult: IPracticeQuizHistory[];
  hardResult: string[];
  isPingActive: boolean;
  currentEasyQuestionIndex: number;
  currentMediumQuestionIndex: number;
}

const initialState: PracticeStageStates = {
  currentSubtitleIdx: -1,
  isPlayingWithRepeatTime: false,
  levelIdx: 0,
  easyResult: [],
  mediumResult: [],
  hardResult: [],
  isPingActive: true,
  currentEasyQuestionIndex: 0,
  currentMediumQuestionIndex: 0,
};

const practiceStageSlice = createSlice({
  name: 'practiceStage',
  initialState,
  reducers: {
    setCurrentSubtitleIdx: (state, action: PayloadAction<number>) => {
      state.currentSubtitleIdx = action.payload;
    },
    incrementCurrentSentenceIdx: (state) => {
      state.currentSubtitleIdx += 1;
    },
    decrementCurrentSentenceIdx: (state) => {
      state.currentSubtitleIdx -= 1;
    },
    setPlayingWithRepeatTime: (state, action: PayloadAction<boolean>) => {
      state.isPlayingWithRepeatTime = action.payload;
    },
    setLevelIdx: (state, action: PayloadAction<number>) => {
      state.levelIdx = action.payload;
    },
    setEasyResult: (state, action: PayloadAction<IPracticeQuizHistory[]>) => {
      state.easyResult = action.payload;
    },
    setMediumResult: (state, action: PayloadAction<IPracticeQuizHistory[]>) => {
      state.mediumResult = action.payload;
    },
    setHardResult: (state, action: PayloadAction<string[]>) => {
      state.hardResult = action.payload;
    },
    clearPracticeHistory: (state) => {
      state.easyResult = [];
      state.mediumResult = [];
    },
    setNextEasyQuestion: (state) => {
      state.currentEasyQuestionIndex++;
    },
    setPrevEasyQuestion: (state) => {
      state.currentEasyQuestionIndex--;
    },
    resetEasyQuestionIndex: (state) => {
      state.currentEasyQuestionIndex = 0;
    },
    setNextMediumQuestion: (state) => {
      state.currentMediumQuestionIndex++;
    },
    setPrevMediumQuestion: (state) => {
      state.currentMediumQuestionIndex--;
    },
    resetMediumQuestionIndex: (state) => {
      state.currentMediumQuestionIndex = 0;
    },
    setPingActive: (state, action: PayloadAction<boolean>) => {
      state.isPingActive = action.payload;
    },
  },
});

export const {
  setCurrentSubtitleIdx,
  incrementCurrentSentenceIdx,
  decrementCurrentSentenceIdx,
  setPlayingWithRepeatTime,
  setLevelIdx,
  setEasyResult,
  setMediumResult,
  setHardResult,
  clearPracticeHistory,
  setNextEasyQuestion,
  setPrevEasyQuestion,
  resetEasyQuestionIndex,
  setNextMediumQuestion,
  setPrevMediumQuestion,
  resetMediumQuestionIndex,
  setPingActive,
} = practiceStageSlice.actions;

export default practiceStageSlice.reducer;
