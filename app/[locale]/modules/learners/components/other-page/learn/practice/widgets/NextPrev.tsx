import { useDispatch, useSelector } from 'react-redux';

import { Icons } from '@/shared/components/Icon/icons';

import { RootState } from '@/modules/learners/store';
import {
  setNextEasyQuestion,
  setNextMediumQuestion,
  setPrevEasyQuestion,
  setPrevMediumQuestion,
} from '@/modules/learners/store/slice/video-detail';

export const NextPrev = ({ totalQuestions }: { totalQuestions: number }) => {
  const { levelIdx, currentEasyQuestionIndex, currentMediumQuestionIndex } =
    useSelector((state: RootState) => state.practiceStage);
  const dispatch = useDispatch();
  return (
    <div className="flex gap-4 items-center shrink-0">
      <button
        className="py-1 px-2 text-text-secondary flex gap-1 items-center disabled:text-text-secondary/50"
        onClick={() =>
          levelIdx === 0
            ? dispatch(setPrevEasyQuestion())
            : dispatch(setPrevMediumQuestion())
        }
        disabled={
          totalQuestions === 0 ||
          (levelIdx === 0
            ? currentEasyQuestionIndex === 0
            : currentMediumQuestionIndex === 0)
        }
      >
        <Icons.caretLeftLight className="w-4 h-4" />
        <span className="text-label-medium">Previous</span>
      </button>
      <div className="h-1 w-1 bg-border/25 rounded-full"></div>
      <button
        className="py-1 px-2 text-text-secondary flex gap-1 items-center disabled:text-text-secondary/50"
        onClick={() =>
          levelIdx === 0
            ? dispatch(setNextEasyQuestion())
            : dispatch(setNextMediumQuestion())
        }
        disabled={
          totalQuestions === 0 ||
          (levelIdx === 0
            ? currentEasyQuestionIndex === totalQuestions - 1
            : currentMediumQuestionIndex === totalQuestions - 1)
        }
      >
        <span className="text-label-medium">Next</span>
        <Icons.caretRightLight className="w-4 h-4" />
      </button>
    </div>
  );
};
