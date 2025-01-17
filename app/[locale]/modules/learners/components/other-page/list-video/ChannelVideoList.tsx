'use client';

import React, { useCallback, useState } from 'react';

import { IMetaData } from '@/shared/types';

import {
  ChannelPageHeader,
  ListVideoSection,
} from '@/modules/learners/components/other-page/list-video';
import { listVideoService } from '@/modules/learners/services/list-video';
import { IChannelDetail, IVideoDetail } from '@/modules/learners/types';

export const ChannelVideoList: React.FC<{
  channel: string;
  initialVideos: IVideoDetail[];
  initialMetadata: IMetaData | null;
  channelInfo: IChannelDetail | null;
}> = ({ channel, initialVideos, initialMetadata, channelInfo }) => {
  const [isValidChannel, setIsValidChannel] = useState(true);
  const getVideosByChannel = useCallback(async (page: number) => {
    const response = await listVideoService.getChannelVideos({
      page,
      size: 10,
      channel: channel,
    });
    // Check if the channel is valid
    response.success ? setIsValidChannel(true) : setIsValidChannel(false);
    return {
      data: response.data?.data || [],
      metadata: response.data?.metaData || {
        page,
        pageSize: 10,
        totalPages: 1,
        total: 0,
      },
    };
  }, []);
  return isValidChannel ? (
    <div className="flex flex-col gap-6">
      {channelInfo && <ChannelPageHeader channelInfo={channelInfo} />}
      <ListVideoSection
        initialVideos={initialVideos}
        initialMetadata={initialMetadata}
        getVideos={getVideosByChannel}
        className="bg-surface border border-border/30 shadow-e2"
      />
    </div>
  ) : (
    <div>Channel not found.</div>
  );
};
