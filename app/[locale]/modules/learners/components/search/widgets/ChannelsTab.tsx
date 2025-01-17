'use client';

import { X } from 'lucide-react';
// import { useTranslations } from 'next-intl';

import ChannelCard from '@/modules/learners/components/other-page/list-video/widgets/ChannelCard';
import { ITopChannelDetail } from '@/modules/learners/types';

interface ChannelsTabProps {
  searchTerm: string;
  handleClear: () => void;
  channels: ITopChannelDetail[];
}

const ChannelsTab: React.FC<ChannelsTabProps> = ({
  searchTerm,
  handleClear,
  channels,
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between gap-4 my-6">
        <div className="inline-flex items-center justify-center px-4 py-1 text-sm capitalize text-border bg-border/25 rounded">
          {searchTerm}
          <button
            onClick={handleClear}
            className="ml-2 text-gray-500 hover:text-gray-700"
            aria-label="Clear search"
          >
            <X size={12} />
          </button>
        </div>
        {/* <span className="text-sm text-muted-foreground mx-2">
          1 / 5 {t('results')}
        </span> */}
      </div>
      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-6 gap-y-6 gap-x-4 px-1">
        {Array.isArray(channels) &&
          channels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
      </div>
    </div>
  );
};

export default ChannelsTab;
