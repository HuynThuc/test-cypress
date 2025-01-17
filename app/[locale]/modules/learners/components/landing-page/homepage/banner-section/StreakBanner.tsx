'use client';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import ServerError from '@/shared/components/token-authen/server-error';

import {
  StreakDetails,
  StreakStatistics,
  WeekStreakIcon,
} from '@/modules/learners/components/landing-page/homepage/banner-section/widgets';
import { IUserStreak } from '@/modules/learners/types';
import { RootState } from '@/modules/learners/store';

export const StreakBanner = ({
  streakData,
  error,
  code,
}: {
  streakData: IUserStreak | null | [];
  error: string | null | undefined;
  code: number | null | undefined;
}) => {
  const isCollapsedSideNav = useSelector(
    (state: RootState) => state.collapsedSidenav.isCollapsed,
  );
  if (code === 401 && error === 'Unauthorized')
    return <ServerError code={code} error={error} />;

  if (!streakData || error) return null;
  const streakMap = Array.isArray(streakData) ? null : streakData;

  return (
    <div className="min-h-[150px] w-full lg:aspect-[5.48] aspect-[2.9] overflow-hidden relative text-text-onPrimary transition-colors duration-300">
      <div className="relative h-[32.25rem] w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] to-[#4ADE80] dark:from-[#0591A7] dark:to-[#3D9F67] transition-all duration-300"></div>
        <Image
          rel="preload"
          src={'/images/bg-streak.svg'}
          alt="streak-banner"
          style={{ objectFit: 'cover', objectPosition: 'top' }}
          fill
          className="opacity-20"
          priority
        />
      </div>
      <div className="w-full h-full absolute inset-1 -mt-1 flex items-center justify-center lg:max-w-[90%] lg:justify-start lg:pl-4 xl:justify-start 2xl:left-6">
        <div className="my-auto">
          <WeekStreakIcon
            currentStreak={(streakData as IUserStreak)?.currentStreak}
          />
        </div>
        <div className="flex flex-col items-center justify-center md:mx-6 lg:flex-row lg:gap-0 md:gap-2 sm:gap-1 sm:ml-6 ml-1">
          <StreakDetails streakData={streakMap as IUserStreak} />
          <div
            className={` relative  md:my-5  lg:right-6 ${isCollapsedSideNav ? 'xl:-right-40' : 'xl:-right-4'} `}
          >
            <StreakStatistics streakData={streakMap as IUserStreak} />
          </div>
        </div>
      </div>
    </div>
  );
};
