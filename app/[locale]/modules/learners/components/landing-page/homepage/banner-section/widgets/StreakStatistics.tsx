'use client';
import { useTranslations } from 'next-intl';

import { IUserStreak } from '@/modules/learners/types';

export const StreakStatistics = ({
  streakData,
}: {
  streakData: IUserStreak;
}) => {
  const t = useTranslations('Streak');

  return (
    <div className="flex flex-row  items-center lg:flex-col gap-1 lg:gap-1 lg:items-start">
      <div className="flex gap-1 items-center ">
        <h3 className="sm:text-[28px] text-[16px] text-gradient">
          {streakData.totalDays}
        </h3>
        <h6 className="sm:text-[16px] text-[14px]">{t('days')}</h6>
      </div>
      <div className="flex gap-1 lg:mx-0 ml-4 sm:ml-6 items-center">
        <h3 className="sm:text-[28px] text-[16px] text-gradient">
          {streakData.totalVideos}
        </h3>
        <h6 className="sm:text-[16px] text-[14px]">{t('videos')}</h6>
      </div>
      <div className="flex gap-1  items-center ml-4 sm:ml-6 lg:mx-0">
        <h3 className="sm:text-[28px] text-[16px] text-gradient">
          {streakData.totalAudios}
        </h3>
        <h6 className="sm:text-[16px] text-[14px]">{t('lessons')}</h6>
      </div>
    </div>
  );
};
