'use client';
import React, { useEffect, useState } from 'react';
import type { CallBackProps, Step } from 'react-joyride';
import Joyride, { EVENTS, STATUS } from 'react-joyride';
import { useDispatch } from 'react-redux';

import { generateSteps } from '@/modules/learners/components/other-page/learn/widget/TourGuideSteps';
import { setLearningStage } from '@/modules/learners/store/slice/video-detail/learningStageSlice';
import {
  closePopupVocab,
  openPopupVocab,
} from '@/modules/learners/store/slice';

interface State {
  run: boolean;
  stepIndex: number;
  steps: Step[];
}
interface TourGuideProps {
  isRun: boolean;
}
const TourGuide = React.forwardRef<HTMLDivElement, TourGuideProps>(
  ({ isRun }, ref) => {
    const dispatch = useDispatch();
    const [progress, setProgress] = useState<number>(1);

    const [{ run, steps }, setState] = useState<State>({
      run: isRun,
      stepIndex: 0,
      steps: generateSteps(progress),
    });

    useEffect(() => {
      if (isRun) {
        setState((prevState) => ({
          ...prevState,
          run: true,
          stepIndex: 0,
          steps: generateSteps(1), // Only update once when the tour starts
        }));
      }
    }, [isRun]);

    useEffect(() => {
      if (run) {
        setState((prevState) => ({
          ...prevState,
          steps: generateSteps(progress), // Update steps when progress changes
        }));
      }
    }, [progress, run]);

    const handelJoyrideCallback = (data: CallBackProps) => {
      const { status, type, index } = data;
      const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
      if (type === EVENTS.TARGET_NOT_FOUND) {
        return;
      }
      if (finishedStatuses.includes(status)) {
        dispatch(closePopupVocab());
        dispatch(setLearningStage(0));
        setState({ run: false, steps, stepIndex: 0 });
      } else if (([EVENTS.STEP_BEFORE] as string[]).includes(type)) {
        const newProgress = index + 1;
        if (newProgress === 1) {
          dispatch(setLearningStage(0));
          dispatch(openPopupVocab());
        }
        if (newProgress === 6) {
          dispatch(setLearningStage(1));
        }
        if (newProgress === 8) {
          dispatch(setLearningStage(2));
        }
        setProgress(newProgress);
      }
    };
    return (
      <div ref={ref}>
        <Joyride
          continuous
          callback={handelJoyrideCallback}
          steps={steps.map((step) => ({
            ...step,
            placement:
              window.innerWidth < 768 ? 'bottom' : step.placement || 'top',
          }))}
          run={run}
          scrollToFirstStep
          showSkipButton
          hideCloseButton
          disableCloseOnEsc
          disableOverlayClose
          debug
          scrollOffset={200}
          styles={{
            tooltip: {
              borderRadius: '8px',
              maxWidth: '300px',
              alignItems: 'end',
              fontSize: window.innerWidth < 768 ? '12px' : '14px',
              padding: window.innerWidth < 768 ? '8px' : '10px',
            },
            tooltipContainer: {
              textAlign: 'center',
            },
            overlay: {
              border: '4px solid hsl(var(--primary-color))',
            },
            spotlight: {
              border: '2px solid hsl(var(--primary-color))',
              margin: '0',
            },
            options: {
              zIndex: 9999,
              arrowColor: 'hsl(var(--background))',
              backgroundColor: 'hsl(var(--background))',
              textColor: 'hsl(var(--text-light))',
              overlayColor: 'rgba(0, 0, 0, 0.4)',
              primaryColor: 'hsl(var(--primary-color))',
            },
          }}
        />
      </div>
    );
  },
);

export default TourGuide;
