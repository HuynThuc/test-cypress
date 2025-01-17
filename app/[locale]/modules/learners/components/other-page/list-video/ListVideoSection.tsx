import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Icons } from '@/shared/components/Icon/icons';
import {
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/shared/components/shacdn-ui';
import { SegmentTransitionEffect } from '@/shared/components/transition';
import { useScreenSize } from '@/shared/hook';
import { IMetaData } from '@/shared/types';
import { cn } from '@/shared/utils';

import { InfiniteScroll } from '@/modules/learners/components/other-page/list-video';
import { SkeletonVideoItem } from '@/modules/learners/components/other-page/list-video/widgets';
import { useInfiniteVideos } from '@/modules/learners/hook/list-video';
import { IVideoDetail } from '@/modules/learners/types';
import { CardVideoItem } from '@/modules/learners/components/landing-page/homepage/widgets';

interface ListVideoSectionProps {
  initialVideos: IVideoDetail[];
  initialMetadata: IMetaData | null;
  /* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
  getVideos: (
    page: number,
    sortBy?: string,
  ) => Promise<{ data: IVideoDetail[]; metadata: IMetaData }>;
  /* eslint-enable no-unused-vars */
  className: string;
}

export const ListVideoSection = ({
  initialVideos,
  initialMetadata,
  getVideos,
  className,
}: ListVideoSectionProps) => {
  const [activeTab, setActiveTab] = useState('latest');

  const { md } = useScreenSize();
  const t = useTranslations('Videos');
  const { videos, loading, error, fetchVideos, resetVideos, metadata } =
    useInfiniteVideos<IVideoDetail>(initialVideos, initialMetadata, getVideos);

  const tabs = ['latest', 'mostViewed', 'topFavorites'];

  const renderCategoryVideos = () => {
    return (
      videos &&
      videos.map((video, index) => (
        <div key={`${video.id}-${index}`}>
          <CardVideoItem video={video} />
        </div>
      ))
    );
  };

  const renderSkeletons = () => {
    return [...Array(12)].map((_, index) => <SkeletonVideoItem key={index} />);
  };

  const tabList = tabs.map((tab) => (
    <TabsTrigger
      key={tab}
      value={tab}
      className="relative w-fit sm:pt-5 sm:pb-[18px] pt-4 pb-3.5 px-0 text-stylized-lead data-[state=active]:text-primary data-[state=active]:after:bg-primary data-[state=active]:after:w-full data-[state=active]:after:absolute data-[state=active]:after:-bottom-[2px] data-[state=active]:after:h-[3px] data-[state=active]:after:border data-[state=active]:after:border-primary data-[state=active]:after:rounded-full"
    >
      {t(tab).toUpperCase()}
    </TabsTrigger>
  ));

  const fetchVideosByTab = (tab: string) => {
    if (tab == 'latest') fetchVideos('publishedAt');
    else if (tab == 'mostViewed') fetchVideos('views');
    else fetchVideos();
  };

  const handleFilterClick = () => {
    // Implement filter functionality
  };

  const handleTabChange = (value: string) => {
    resetVideos();
    fetchVideosByTab(value);
    setActiveTab(value);
  };

  return (
    <div
      className={cn(
        'w-full px-6 bg-background rounded min-h-screen pb-6',
        className,
      )}
    >
      <div className="flex justify-between items-center rounded-t-lg pb-px mb-6">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full border-b border-border/25"
        >
          <TabsList className="bg-transparent w-full sm:justify-start justify-between h-fit p-0 overflow-visible flex sm:gap-8 gap-4 text-border">
            {tabList}
          </TabsList>
        </Tabs>
        <div className="border-b border-border/25 self-stretch sm:flex hidden items-center pr-[7px] text-primary">
          <Button
            variant={md ? 'outline' : 'ghost'}
            size={md ? 'default' : 'icon'}
            onClick={handleFilterClick}
            className="flex gap-2 ml-4 border-primary hover:bg-border/15 md:rounded-full rounded-xl text-label-medium"
          >
            <Icons.filter className="h-6 w-6 text-primary" />
            {md && <span>Filters</span>}
          </Button>
        </div>
      </div>
      <SegmentTransitionEffect trigger={activeTab}>
        <InfiniteScroll
          loadMore={fetchVideos}
          hasMore={
            !loading &&
            !error &&
            (!metadata || metadata.page < metadata.totalPages)
          }
          loader={renderSkeletons()}
        >
          <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-y-6 gap-x-4 px-1 justify-items-stretch">
            {renderCategoryVideos()}
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </InfiniteScroll>
      </SegmentTransitionEffect>
    </div>
  );
};
