import React, { ReactNode } from 'react';

import { ITitleLocale } from '@/shared/types';
import { Icons } from '@/shared/components/Icon/icons';

import ChooseVocabulary from '@/modules/learners/components/other-page/learn/vocabulary/overview/overview';
import Flashcard from '@/modules/learners/components/other-page/learn/vocabulary/flashcard/Flashcard';
import Quiz from '@/modules/learners/components/other-page/learn/vocabulary/quiz/Quiz';

export type StageId = 'overView' | 'flashcard' | 'quiz';
export type StageStatus = 'notVisited' | 'inProgress' | 'completed' | 'notDone';

export interface VocabularyStage {
  id: StageId;
  label: ITitleLocale;
  icon: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
}

export const vocabularyStages: VocabularyStage[] = [
  {
    id: 'overView',
    label: {
      en: 'Choose words',
      vi: 'Chọn từ',
      ja: '単語を選ぶ',
    },
    icon: <Icons.docSuccess />,
    component: ChooseVocabulary,
  },
  {
    id: 'flashcard',
    label: {
      en: 'Flashcard',
      vi: 'Thẻ từ',
      ja: '単語カード',
    },
    icon: <Icons.cardTwo />,
    component: Flashcard,
  },
  {
    id: 'quiz',
    label: {
      en: 'Quiz',
      vi: 'Kiểm tra',
      ja: 'クイズ',
    },
    icon: <Icons.quiz />,
    component: Quiz,
  },
];

export const initialStageStatus: Record<StageId, StageStatus> = {
  overView: 'inProgress',
  flashcard: 'notVisited',
  quiz: 'notVisited',
};
