import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

import { AutoClampText } from '@/shared/components/text/AutoClampText';

import { RootState } from '@/modules/learners/store';

interface SubtitleDisplayProps {
  currentSubtitle: string;
  parentHeight: number;
}

export default function SubtitleDisplay({
  currentSubtitle,
  parentHeight,
}: SubtitleDisplayProps) {
  const { currentStageIndex } = useSelector(
    (state: RootState) => state.learningStage,
  );

  const t = useTranslations('Learn');
  return (
    <div className="md:p-2 text-center flex items-center justify-center h-full">
      <AutoClampText
        className="md:text-lg text-sm font-medium leading-normal"
        parentHeight={parentHeight}
      >
        {currentStageIndex === 0 ? currentSubtitle : t('subtitlesOff')}
      </AutoClampText>
    </div>
  );
}
