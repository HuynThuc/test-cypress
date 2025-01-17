import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/shared/components/shacdn-ui/Button';
import { useGetCurrentLocale } from '@/shared/hook';
import { useCustomRouter } from '@/shared/utils/routerCustom';
import { Toaster } from '@/shared/components';

import {
  DictationSection,
  EasySection,
  MediumSection,
  PracticeTopSection,
} from '@/modules/learners/components/other-page/learn/practice';
import { RootState } from '@/modules/learners/store';
import {
  IPracticeQuiz,
  IPracticeQuizHistory,
} from '@/modules/learners/types/video-detail';
import {
  clearPracticeHistory,
  setEasyResult,
  setHardResult,
  setMediumResult,
  setPingActive,
} from '@/modules/learners/store/slice/video-detail';

interface PracticeProps {
  easyData: IPracticeQuiz[];
  easyDataError: string | null;
  mediumData: IPracticeQuiz[];
  mediumDataError: string | null;
}

export default function Practice({
  easyData,
  easyDataError,
  mediumData,
  mediumDataError,
}: PracticeProps) {
  const { levelIdx } = useSelector((state: RootState) => state.practiceStage);
  const { data: loginInfo } = useSelector((state: RootState) => state.session);
  const { processedSubtitles } = useSelector(
    (state: RootState) => state.youtubePlayer,
  );
  const { pushWithLocale } = useCustomRouter(useGetCurrentLocale);
  const dispatch = useDispatch();
  const numOfSubtitles = processedSubtitles ? processedSubtitles.length : 0;

  const renderChallengeByLevelIdx = () =>
    levelIdx === 0 ? (
      <EasySection easyData={easyData} easyDataError={easyDataError} />
    ) : levelIdx === 1 ? (
      <MediumSection
        mediumData={mediumData}
        mediumDataError={mediumDataError}
      />
    ) : (
      <DictationSection />
    );

  useEffect(() => {
    dispatch(setPingActive(true));
    dispatch(clearPracticeHistory());
    const initialArray: IPracticeQuizHistory[] =
      mediumData && mediumData.length > 0
        ? mediumData.map((item) => ({ id: item.id, selectedAnswer: [] }))
        : Array(mediumData.length).fill({ id: '', selectedAnswer: [] });
    dispatch(setMediumResult(initialArray));
    dispatch(setEasyResult(initialArray));
    dispatch(setHardResult(Array(numOfSubtitles).fill('default text')));
  }, []);

  return (
    <div className="relative md:px-4 px-2 space-y-4 h-full overflow-hidden flex flex-col">
      <PracticeTopSection />
      {loginInfo ? (
        <>
          {renderChallengeByLevelIdx()}
          <Toaster />
        </>
      ) : (
        <div className="h-full flex flex-col justify-center items-center gap-4">
          <h5>Please signin to start learning</h5>
          <Button
            variant="outline"
            className="border-2 border-primary bg-surface hover:bg-primary hover:text-text-onPrimary"
            onClick={() =>
              pushWithLocale({
                url: '/signin',
              })
            }
          >
            Go to SignIn
          </Button>
        </div>
      )}
    </div>
  );
}
