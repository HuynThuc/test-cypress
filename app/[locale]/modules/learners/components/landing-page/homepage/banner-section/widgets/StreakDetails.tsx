'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { IUserStreak, IStreakDay } from '@/modules/learners/types';

const daysMap = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

// Component to display streak details
export const StreakDetails = ({ streakData }: { streakData: IUserStreak }) => {
  const t = useTranslations('Streak');
  const renderStreakDetailsItem = () => {
    const daysAbbreviation = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return daysAbbreviation.map((dayAbbrev, index) => {
      // Get the day name corresponding to the index from daysMap
      const dayKey = daysMap[index] as keyof typeof streakData.streakDetails;

      // Get the streak details for the current day
      const streakDetails: IStreakDay = streakData.streakDetails[dayKey];

      return (
        <div className="flex flex-col items-center" key={index}>
          <div className="md:text-[0.875rem] text-[1rem]">{dayAbbrev}</div>

          {streakDetails.streak ? (
            // If streak is true, display the checked icon
            <Image
              rel="preload"
              src={'/icons/checked-ic.svg'}
              alt="checked ic"
              width={32}
              height={32}
              className="animate-scale-up delay-200"
            />
          ) : (
            // If streak is false, display the day number
            <div className="md:min-h-[32px] min-h-[26px] flex items-center">
              {streakDetails.date}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col lg:gap-2 gap-2 mx-2 sm:mx-0">
      <div>
        {/* Display current streak information */}
        <div className="font-bold sm:text-[24px] text-sm">
          {streakData?.currentStreak?.periodNum} {t('weekStreak')}
        </div>
        <div className="sm:text-[14px] text-[14px]">{t('welcome')}</div>
      </div>

      {/* Calendar section with days and streak icons */}
      <div className="flex min-w-[15rem] sm:min-w-[20rem] min-h-[3rem] justify-between">
        {renderStreakDetailsItem()}
      </div>
    </div>
  );
};
