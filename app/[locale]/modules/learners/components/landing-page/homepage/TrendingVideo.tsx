'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import React from 'react';

import { LoadingIndicator } from '@/shared/components';

import Section from '@/modules/learners/components/landing-page/homepage/widgets/SectionItemCustom';
import { IVideoDetail } from '@/modules/learners/types';
import { CardVideoItem } from '@/modules/learners/components/landing-page/homepage/widgets/CardVideoItem';
import { RootState } from '@/modules/learners/store';
import { LoginResponse } from '@/modules/helenngolang/types';
import { videosHistoryLocalService } from '@/app/[locale]/modules/learners/services/landing/VideosHistoryLocal.service';
import { IVideoActivity } from '@/modules/learners/types/VideoContinue.types';

interface TrendingVideoProps {
  videos: IVideoDetail[] | [];
  error: string | null | undefined;
}

const TrendingVideo: React.FC<TrendingVideoProps> = ({ videos, error }) => {
  const t = useTranslations('Home');
  const session: LoginResponse | null = useSelector(
    (state: RootState) => state.session.data,
  );
  const [loading, setLoading] = useState(false);
  const handleOnclick = async (video: IVideoDetail) => {
    if (session === null) return;
    setLoading(true);
    try {
      const videoHistorry: IVideoActivity = {
        video: video,
        progressAtSeconds: 1,
        actionAt: new Date().toISOString(),
      };
      videosHistoryLocalService.addVideoToHistory(
        videoHistorry,
        session.user.id,
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };
  // If there is an error or no videos, do not render
  if (error || videos?.length === 0) return null;

  if (loading)
    return (
      <div className="max-h-[235px]">
        <LoadingIndicator />
      </div>
    );

  return (
    <Section
      label={t('trendingVideos')}
      listCard={videos}
      renderItem={(video, index) => (
        <div
          onClick={() => {
            if (!session) return;
            handleOnclick(video);
          }}
        >
          <CardVideoItem key={index} video={video} className="w-[240px]" />
        </div>
      )}
    />
  );
};

export default React.memo(TrendingVideo, (prevProps, nextProps) => {
  // Compare props to check if re-render is needed
  return (
    prevProps.videos === nextProps.videos && prevProps.error === nextProps.error
  );
});
