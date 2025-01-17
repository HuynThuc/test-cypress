import Image from 'next/image';
import React from 'react';
import { useTranslations } from 'next-intl';

import { Icons } from '@/shared/components/Icon/icons';
import { Separator } from '@/shared/components/shacdn-ui';

import { IChannelDetail } from '@/modules/learners/types';
import { formatViewCount } from '@/modules/learners/utils';

export const ChannelPageHeader = ({
  channelInfo,
}: {
  channelInfo: IChannelDetail;
}) => {
  const t = useTranslations('Videos');
  return (
    <div className="relative rounded border border-border/30 shadow-e2 overflow-hidden">
      <Image
        src={channelInfo.bannerUrl}
        alt="Channel Header"
        width={1920}
        height={400}
        className="object-cover"
        layout="responsive"
      />
      <Image
        src={channelInfo.avatarUrl}
        alt="Channel Avatar"
        width={144}
        height={144}
        className="rounded-full object-cover aspect-square absolute bottom-2 left-4 border-4 border-surface sm:w-auto sm:h-auto w-32 h-32"
      />
      <div className="rounded-b bg-surface border-t-0 py-2">
        <div className="flex flex-col gap-2 ml-[184px] md:ml-[125px]">
          <h4>{channelInfo.title}</h4>
          <div className="flex sm:gap-3 gap-1 sm:flex-row flex-col sm:items-center items-start">
            <div className="flex gap-2 text-text-secondary">
              <Icons.videos className="w-6 h-6 text-icon" />
              <span className="text-label-large">
                {channelInfo.totalVideosCount} videos
              </span>
            </div>
            <Separator
              orientation="vertical"
              className="w-0.5 h-4 rounded-full bg-border/25 sm:block hidden"
            />
            <div className="flex gap-2 text-text-secondary">
              <Icons.users className="w-6 h-6 text-icon" />
              <span className="text-label-large">
                {formatViewCount(channelInfo.totalPracticedUser)}{' '}
                {t('usersPracticed')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
