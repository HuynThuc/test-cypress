'use client';
import { useTranslations } from 'next-intl';
import React from 'react';

import Section from '@/modules/learners/components/landing-page/homepage/widgets/SectionItemCustom';
import { IVideoCategory } from '@/modules/learners/types';
import { VideoCategoryCard } from '@/modules/learners/components/landing-page/homepage/widgets';

interface VideoCategoriesProps {
  videoCategories: IVideoCategory[] | [] | null;
  error: string | null | undefined;
}

const VideoCategories: React.FC<VideoCategoriesProps> = React.memo(
  ({ videoCategories, error }) => {
    const t = useTranslations('Home');

    // If there is an error or no videos, do not render
    if (error || videoCategories?.length === 0 || !videoCategories) return null;

    return (
      <Section
        label={t('discoverGenres')}
        isViewAll={false}
        listCard={videoCategories}
        renderItem={(videoCategory, index) => (
          <VideoCategoryCard key={index} category={videoCategory} />
        )}
      />
    );
  },
  (prevProps, nextProps) => {
    // Compare props to check if re-render is needed
    return (
      prevProps.videoCategories === nextProps.videoCategories &&
      prevProps.error === nextProps.error
    );
  },
);
export default VideoCategories;
