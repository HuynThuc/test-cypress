'use client';
import { useTranslations } from 'next-intl';

import { IAudioTopics } from '@/modules/learners/types/AudioTopics.types';
import Section from '@/modules/learners/components/landing-page/homepage/widgets/SectionItemCustom';
import CardAudio from '@/modules/learners/components/landing-page/homepage/CardAudio';

const AudioTopics = ({
  lstAudioTopics,
  error,
}: {
  lstAudioTopics: IAudioTopics[] | null;
  error: string | null;
}) => {
  const t = useTranslations('Home');
  if (!lstAudioTopics || !lstAudioTopics.length || error) return null;
  return (
    <div className="lg:max-h-[143px] lg:min-h-[142px] max-h-[179px] min-h-[178px]">
      <Section
        label={t('exploreAudioTopics')}
        listCard={lstAudioTopics}
        isViewAll={false}
        renderItem={(video, index) => <CardAudio key={index} video={video} />}
      />
    </div>
  );
};

export default AudioTopics;
