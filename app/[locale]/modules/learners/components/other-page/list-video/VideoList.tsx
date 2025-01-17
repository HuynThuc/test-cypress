'use client';
import React from 'react';

import { useVideoContext } from '@/modules/learners/context/list-video';
import { listVideoService } from '@/modules/learners/services/list-video';
import Section from '@/modules/learners/components/landing-page/homepage/widgets/SectionItemCustom';
import { CardVideoItem } from '@/modules/learners/components/landing-page/homepage/widgets';
import { TopPracticeVideoCarousel } from '@/modules/learners/components/other-page/list-video';
import { InfiniteScroll } from '@/modules/learners/components/other-page/list-video';
import { SkeletonVideoItem } from '@/modules/learners/components/other-page/list-video/widgets';
import { IChannelVideoList, IVideoDetail } from '@/modules/learners/types';
import { useInfiniteVideos } from '@/modules/learners/hook/list-video';
import TopChannels from '@/modules/learners/components/other-page/list-video/widgets/TopChannels';

export const VideoList: React.FC = () => {
  const { trendingVideos, topChannels } = useVideoContext();
  const {
    videos: forYouVideos,
    loading,
    error,
    fetchVideos,
    metadata,
  } = useInfiniteVideos<IChannelVideoList>([], null, async (page) => {
    const response = await listVideoService.getChannels({ page });
    return {
      data: response.data?.data || [],
      metadata: response.data?.metaData || {
        page,
        pageSize: 10,
        totalPages: 1,
        total: 0,
      },
    };
  });

  const renderForYouVideos = () => {
    if (!Array.isArray(forYouVideos)) {
      return null;
    }

    return forYouVideos.map(
      (channelVideoList: IChannelVideoList, index: number) => (
        <Section
          key={`${channelVideoList.channel.id}-${index}`}
          label={channelVideoList.channel.title}
          listCard={channelVideoList.videos}
          renderItem={(video: IVideoDetail, videoIndex: number) => (
            <div key={`${video.id}-${videoIndex}`}>
              <CardVideoItem video={video} className="w-[240px]" />
            </div>
          )}
        />
      ),
    );
  };

  const renderSkeletons = () => (
    <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(256px,1fr))] gap-6 justify-items-center justify-center items-center">
      {[...Array(12)].map((_, index) => (
        <SkeletonVideoItem key={index} />
      ))}
    </div>
  );

  return (
    <div className="w-full h-auto pb-8 flex flex-col">
      <div className="mb-6">
        <TopPracticeVideoCarousel trendingVideos={trendingVideos} />
      </div>
      <div className="mt-2 mb-7">
        <TopChannels channels={topChannels} />
      </div>
      <InfiniteScroll
        loadMore={fetchVideos}
        hasMore={
          !loading &&
          !error &&
          (!metadata || metadata.page < metadata.totalPages)
        }
        loader={renderSkeletons()}
      >
        <div className="space-y-8">{renderForYouVideos()}</div>
      </InfiniteScroll>
      {error && <div className="text-red-500 text-center">{error}</div>}
    </div>
  );
};
