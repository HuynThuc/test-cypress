'use client';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Icons } from '@/shared/components/Icon/icons';

import { IVideoDetail } from '@/modules/learners/types';
import { CardVideoItem } from '@/modules/learners/components/landing-page/homepage/widgets/CardVideoItem';

interface VideosTabProps {
  searchTerm: string;
  handleClear: () => void;
  videos?: IVideoDetail[] | undefined;
  handleLoadMore: () => void;
}

const VideosTab: React.FC<VideosTabProps> = ({
  searchTerm,
  handleClear,
  videos,
  handleLoadMore,
}) => {
  const t = useTranslations('Home');
  const renderVideos = () => (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-6 gap-y-6 gap-x-4 px-1 justify-items-stretch">
      {videos?.map((video, index) => (
        <CardVideoItem key={video.id || index} video={video} />
      ))}
    </div>
  );

  const renderLoadMoreButton = () => (
    <div className="flex items-center justify-center mt-8 relative">
      <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-px border border-border/45"></div>
      <button
        onClick={handleLoadMore}
        className="relative px-20 py-1 mx-4 border border-border bg-background text-primary rounded-full flex items-center z-50"
      >
        <span className="inline-block bg-background whitespace-nowrap">
          {t('showMore')}
        </span>
        <Icons.caretdown size={16} className="ml-2" />
      </button>
    </div>
  );
  return (
    <div>
      <div className="flex justify-between gap-4 my-6">
        <div className="inline-flex items-center justify-center px-4 py-1 text-sm capitalize bg-border/15 rounded">
          <span className="hover:text-text-light text-border/75">
            {searchTerm}
          </span>
          <button
            onClick={handleClear}
            className="ml-2 text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
          >
            <X size={12} />
          </button>
        </div>
      </div>
      {renderVideos()}
      {renderLoadMoreButton()}
    </div>
  );
};

export default VideosTab;
