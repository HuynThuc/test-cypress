import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { stages } from '@/modules/learners/constants/video-detail/StageDefinition';
import { IListVideoWords } from '@/modules/learners/types/video-detail/VideoDetail.types';

interface StageCompletionState {
  [key: string]: boolean;
}

interface LearningStageState {
  currentStageIndex: number;
  stageCompletion: StageCompletionState;
  listWord: IListVideoWords[] | [];
}

const initialState: LearningStageState = {
  currentStageIndex: 0,
  stageCompletion: stages.reduce((acc, stage) => {
    acc[stage.id] = false;
    return acc;
  }, {} as StageCompletionState),
  listWord: [],
};

const learningStageSlice = createSlice({
  name: 'learningStage',
  initialState,
  reducers: {
    setLearningStage: (state, action: PayloadAction<number>) => {
      const newIndex = Math.min(Math.max(action.payload, 0), stages.length - 1);
      if (newIndex < state.currentStageIndex) {
        // If moving backwards, mark all stages after the new index as incomplete
        for (let i = newIndex + 1; i <= state.currentStageIndex; i++) {
          if (state.stageCompletion && stages[i])
            state.stageCompletion[stages[i].id] = false;
        }
      }
      state.currentStageIndex = newIndex;
    },
    completeStage: (state, action: PayloadAction<string>) => {
      if (!state.stageCompletion) state.stageCompletion = {};

      const stageIndex = stages.findIndex(
        (stage) => stage.id === action.payload,
      );

      if (stageIndex !== -1) {
        state.stageCompletion[action.payload] = true;

        if (stageIndex < stages.length - 1)
          state.currentStageIndex = stageIndex + 1;
      }
    },
    skipStage: (state, action: PayloadAction<number>) => {
      const newIndex = Math.min(Math.max(action.payload, 0), stages.length - 1);
      state.currentStageIndex = newIndex;
      // Do not mark the skipped stage as completed
    },

    resetStage: (state, action: PayloadAction<string>) => {
      if (state.stageCompletion) state.stageCompletion[action.payload] = false;
    },
    setListWord: (state, action: PayloadAction<IListVideoWords[] | []>) => {
      state.listWord = action.payload;
    },
  },
});

export const {
  setLearningStage,
  completeStage,
  skipStage,
  resetStage,
  setListWord,
} = learningStageSlice.actions;
export default learningStageSlice.reducer;
