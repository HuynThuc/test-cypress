'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

import { useScreenSize } from '@/shared/hook';

import { ICurrentStreak } from '@/modules/learners/types';
import { RootState } from '@/modules/learners/store';

export const WeekStreakIcon = ({
  currentStreak,
}: {
  currentStreak: ICurrentStreak;
}) => {
  const t = useTranslations('Streak');
  const { xl } = useScreenSize();
  const isCollapsedSideNav = useSelector(
    (state: RootState) => state.collapsedSidenav.isCollapsed,
  );
  return (
    <div
      className={`bg-white border-0 aspect-square rounded-full flex flex-col items-center justify-center relative h-[128px] md:h-[180px] lg:h-[128px] ${isCollapsedSideNav && xl ? 'xl:h-[148px]' : 'xl:h-[128px]'}`}
    >
      {/* Gradient Border */}
      <div className="absolute inset-0 rounded-full p-[4px] bg-gradient-to-r from-[hsla(184,100%,44%,1)] to-[hsla(154,94%,34%,1)]">
        <div className="bg-white w-full h-full rounded-full"></div>
      </div>

      {/* Fire Icon and Text */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <Image
          rel="preload"
          src={'/icons/fireIcon.svg'}
          alt="fire icon"
          width={34}
          height={46}
          className="sm:h-auto sm:w-auto h-6 w-6"
        />
        <div className="text-text-prima md:text-[20px] text-[16px] font-bold">
          {currentStreak?.periodNum} {t('week')}
        </div>
      </div>

      {/* Shadow Effects */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow:
            '0 4px 8px hsla(236, 8%, 41%, 0.2), 0 2px 0 hsla(237, 21%, 20%, 0.4)',
        }}
      ></div>
    </div>
  );
};
