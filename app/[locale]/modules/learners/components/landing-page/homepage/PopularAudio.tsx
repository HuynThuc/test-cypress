'use client';

import { useTranslations } from 'next-intl';

import CardPopularAudio from '@/modules/learners/components/landing-page/homepage/CardPopular';
import Section from '@/modules/learners/components/landing-page/homepage/widgets/SectionItemCustom';
import { IPopularAudios } from '@/modules/learners/types/PopularAudio.types';

const PopularAudio = ({
  audios,
  error,
}: {
  audios: IPopularAudios[];
  error: string | null;
}) => {
  const t = useTranslations('Home');
  if (error || !audios) return null;

  return (
    <div className="w-full">
      <div className="w-full">
        <Section
          label={t('popularAudio')}
          listCard={audios}
          isViewAll={false}
          renderItem={(video, index) => (
            <CardPopularAudio key={index} video={video} />
          )}
        />
      </div>
    </div>
  );
};

export default PopularAudio;
