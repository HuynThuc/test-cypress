'use client';
import { useTranslations } from 'next-intl';
import { IoEyeSharp } from 'react-icons/io5';
import { PiGlobeHemisphereWest } from 'react-icons/pi';

import { accentToString, LanguageToString } from '@/shared/utils';

import { IVideoDetail } from '@/modules/learners/types';
import { formatViewCount } from '@/modules/learners/utils';

type VideoInfoProps = {
  video: IVideoDetail;
};

export default function VideoInfo({ video }: VideoInfoProps) {
  const t = useTranslations('Home');

  return (
    <div className="flex bg-surface rounded w-full h-[78px] p-4">
      <div className="flex flex-col justify-between">
        <h6 className="w-full font-normal 2xl:line-clamp-2 line-clamp-1">
          {LanguageToString(video.title)}
        </h6>
        <div className="flex gap-3 w-full text-text-secondary font-medium leading-4">
          <div className="flex gap-1 items-center">
            <PiGlobeHemisphereWest className="w-4 h-4" />
            <span>
              {t('accent')}
              {accentToString(video.accent)}
            </span>
          </div>
          <div className="flex gap-1 items-center">
            <PiGlobeHemisphereWest className="w-4 h-4" />
            <span>{video.cefrLevel}</span>
          </div>
          <div className="flex gap-1 items-center">
            <IoEyeSharp className="w-4 h-4" />
            <span>{formatViewCount(video.totalViewed)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
