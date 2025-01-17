/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType } from 'react';

import { ITitleLocale } from '@/shared/types';

import Vocabulary from '@/modules/learners/components/other-page/learn/vocabulary/Vocabulary';
import Practice from '@/modules/learners/components/other-page/learn/practice/Practice';
import Transcript from '@/modules/learners/components/other-page/learn/transcript/Transcript';

export interface StageDefinition {
  id: string;
  display: ITitleLocale;
  component: ComponentType<any>;
}
export const stages: StageDefinition[] = [
  {
    id: 'vocabulary',
    display: {
      en: 'Vocab',
      vi: 'Từ vựng',
      ja: '語彙',
    },
    component: Vocabulary,
  },
  {
    id: 'practice',
    display: {
      en: 'Practice',
      vi: 'Luyện tập',
      ja: '練習',
    },
    component: Practice,
  },
  {
    id: 'transcript',
    display: {
      en: 'Transcript',
      vi: 'Bản dịch',
      ja: '翻訳',
    },
    component: Transcript,
  },
];
