'use client';

import { useTranslations } from 'next-intl';

import { CustomImage } from '@/shared/components/lazy-image/CutomImage';
import { Icons } from '@/shared/components/Icon/icons';
import { accentToString, cn, LanguageToString } from '@/shared/utils';
import { useCustomRouter } from '@/shared/utils/routerCustom';
import { useGetCurrentLocale } from '@/shared/hook';

import { CefrLevelTag } from '@/modules/learners/components/learners-layout/tag';
import { IVideoDetail } from '@/modules/learners/types';
import { formatViewCount, getYouTubeID } from '@/modules/learners/utils';

interface CardRecommentProps {
  video: IVideoDetail;
}

const CardRecomment: React.FC<CardRecommentProps> = ({ video }) => {
  const t = useTranslations('Home');
  const { pushWithLocale } = useCustomRouter(useGetCurrentLocale);

  return (
    <div
      className={cn('flex flex-row gap-3 cursor-pointer')}
      onClick={() => {
        pushWithLocale({
          url: '/learn',
          params: `v=${getYouTubeID(video.youtubeUrl)}`,
        });
      }}
    >
      <div className="relative w-[240px] md:w-[140px] lg:w-[160px] xl:w-[240px] overflow-hidden aspect-[16/9]">
        <CustomImage
          src={video.thumbnailUrl}
          alt="fail to load"
          width={240}
          height={135}
          className="w-full h-full object-cover rounded"
        />

        <div className="absolute bottom-2 right-2 text-label-small px-4 py-1 md:px-3 md:py-0.5 lg:px-4 lg:py-1 bg-[#1C1C28]/75 rounded-[4px] text-white">
          <p className="w-8 text-center">{video.durationText}</p>
        </div>
      </div>
      <div className="flex-1 w-full text-text-secondary text-label-medium lg:w-[240px] space-y-2">
        <h3 className="text-[16px] md:text-[14px] lg:text-[16px] font-[400] leading-snug line-clamp-3 overflow-hidden text-text-secondary">
          {LanguageToString(video.title)}
        </h3>
        <div className="flex items-center gap-2 mt-1 text-[12px] md:text-[10px] lg:text-[12px] whitespace-nowrap overflow-hidden text-ellipsis">
          <CefrLevelTag level={video.cefrLevel} />
          <div className="w-1 h-1 bg-border rounded-full"></div>
          <span>
            {t('accent')} {accentToString(video.accent)}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-[12px] md:text-[10px] lg:text-[12px]">
          <Icons.eye />
          <span>
            {formatViewCount(video.totalViewed)} {t('views')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardRecomment;
