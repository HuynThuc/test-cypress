'use client';
import { useTranslations } from 'next-intl';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

import { CustomImage } from '@/shared/components/lazy-image/CutomImage';
import { accentToString, cn, LanguageToString } from '@/shared/utils';

import { CefrLevelTag } from '@/modules/learners/components/learners-layout/tag';
import { IVideoDetail } from '@/modules/learners/types';
import { formatViewCount, getYouTubeID } from '@/modules/learners/utils';
import { setVideoId } from '@/modules/learners/store/slice';

interface CardVideoItemProps {
  video: IVideoDetail;
  className?: string;
}

export const CardVideoItem = ({ video, className }: CardVideoItemProps) => {
  const t = useTranslations('Home');
  const dispatch = useDispatch();

  const {
    youtubeUrl,
    thumbnailUrl,
    durationText,
    title,
    cefrLevel,
    accent,
    totalViewed,
  } = video;
  const videoId = getYouTubeID(youtubeUrl) || '';

  return (
    <Link
      href={{
        pathname: '/learn',
        query: { v: videoId },
      }}
      onClick={() => {
        dispatch(setVideoId(videoId));
      }}
      className={cn(
        'flex flex-col justify-between w-full min-w-[240px] relative cursor-pointer',
        className,
      )}
    >
      <div className="flex flex-col gap-2 w-full min-w-[240px] overflow-hidden">
        <div className="relative">
          <CustomImage
            src={thumbnailUrl}
            alt={'failed to load'}
            className="rounded aspect-video w-full object-cover"
            width={240}
            height={135}
            priority
          />
          <div className="absolute bottom-2 right-2 text-label-small px-2 py-0.5 bg-[#1C1C28]/75 rounded-[4px] text-white">
            <p className="w-8 text-center">{durationText}</p>
          </div>
        </div>
        <div className="text-body-14pt text-ellipsis overflow-hidden h-full line-clamp-2">
          {LanguageToString(title)}
        </div>
        <div className="w-full flex items-center text-text-secondary text-label-medium">
          <div className="w-full flex items-center justify-start gap-2">
            <CefrLevelTag level={cefrLevel} />
            <div className="w-1 h-1 bg-border rounded-full"></div>
            <span>
              {t('accent')} {accentToString(accent)}
            </span>
            <div className="w-1 h-1 bg-border rounded-full"></div>
            <span>
              {formatViewCount(totalViewed)} {t('views')}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
