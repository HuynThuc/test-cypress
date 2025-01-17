'use client';
import React from 'react';

import { ITopChannelDetail } from '@/modules/learners/types';
import ChannelCard from '@/modules/learners/components/other-page/list-video/widgets/ChannelCard';
import Section from '@/modules/learners/components/landing-page/homepage/widgets/SectionItemCustom';

interface TopChannelsProps {
  channels: ITopChannelDetail[];
  error?: string | null | undefined;
}
const TopChannels: React.FC<TopChannelsProps> = ({ channels }) => (
  <Section
    label="Top Channels This Week"
    listCard={channels}
    isViewAll={false}
    renderItem={(channel: ITopChannelDetail, index: number) => (
      <div key={`${channel.id}-${index}`}>
        <ChannelCard channel={channel} />
      </div>
    )}
  />
);

export default React.memo(TopChannels, (prevProps, nextProps) => {
  // Compare props to check if re-render is needed
  return (
    prevProps.channels === nextProps.channels &&
    prevProps.error === nextProps.error
  );
});
