'use client';
import React, { createContext, useState, useContext } from 'react';

import {
  IChannelVideoList,
  ITrendingVideoDetail,
  ITopChannelDetail,
} from '../../types/VideoChannels.types';

interface VideoContextType {
  forYouVideos: IChannelVideoList[];
  setForYouVideos: React.Dispatch<React.SetStateAction<IChannelVideoList[]>>;
  trendingVideos: ITrendingVideoDetail[];
  setTrendingVideos: React.Dispatch<
    React.SetStateAction<ITrendingVideoDetail[]>
  >;
  topChannels: ITopChannelDetail[];
  setTopChannels: React.Dispatch<React.SetStateAction<ITopChannelDetail[]>>;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{
  children: React.ReactNode;
  initialVideos: IChannelVideoList[];
  initialTrendingVideos: ITrendingVideoDetail[];
  initialTopChannels: ITopChannelDetail[];
}> = ({
  children,
  initialVideos,
  initialTrendingVideos,
  initialTopChannels,
}) => {
  const [forYouVideos, setForYouVideos] =
    useState<IChannelVideoList[]>(initialVideos);
  const [trendingVideos, setTrendingVideos] = useState<ITrendingVideoDetail[]>(
    initialTrendingVideos,
  );
  const [topChannels, setTopChannels] =
    useState<ITopChannelDetail[]>(initialTopChannels);

  return (
    <VideoContext.Provider
      value={{
        forYouVideos,
        setForYouVideos,
        trendingVideos,
        setTrendingVideos,
        topChannels,
        setTopChannels,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }
  return context;
};
