'use client';
import * as React from 'react';
import Image from 'next/image';

import { ITopChannelDetail } from '@/modules/learners/types';
import {
  SliderChannelDetails,
  SliderDesktopCarousel,
  SliderMobileNavigation,
  SliderSeparator,
} from '@/modules/learners/components/landing-page/homepage/widgets';

interface SliderChannelsProps {
  topChannels: ITopChannelDetail[];
  error: string | null | undefined;
}

const SliderChannels: React.FC<SliderChannelsProps> = React.memo(
  ({ topChannels, error }) => {
    const limitedTopChannels = topChannels.slice(0, 5);
    const [currentChannelIndex, setCurrentChannelIndex] = React.useState(0);
    const [touchStart, setTouchStart] = React.useState<number | null>(null);
    const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

    if (error || limitedTopChannels.length === 0 || !limitedTopChannels)
      return null;

    const currentChannel = limitedTopChannels[currentChannelIndex];

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const nextChannel = () => {
      setCurrentChannelIndex((prev) => (prev + 1) % limitedTopChannels.length);
    };

    const prevChannel = () => {
      setCurrentChannelIndex(
        (prev) =>
          (prev - 1 + limitedTopChannels.length) % limitedTopChannels.length,
      );
    };

    const onTouchStart = (e: React.TouchEvent) => {
      setTouchEnd(null);
      setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
      if (!touchStart || !touchEnd) return;

      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe) {
        nextChannel();
      }
      if (isRightSwipe) {
        prevChannel();
      }
    };

    return (
      <div className="w-full">
        <div className="bg-surface shadow-lg rounded-lg overflow-hidden">
          <div
            className="flex flex-col md:flex-row md:h-80 relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Left Image Section */}
            <div className="relative w-full md:w-[70%] h-48 md:h-full overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src={currentChannel.bannerUrl}
                  alt={currentChannel.title}
                  fill
                  className="object-cover md:clip-path-polygon"
                  priority
                />
              </div>
              <SliderMobileNavigation
                totalItems={limitedTopChannels.length}
                currentIndex={currentChannelIndex}
                onDotClick={setCurrentChannelIndex}
              />
            </div>

            {/* Separator Section */}
            <div className="hidden md:block absolute left-[65%] w-[19%] h-full z-10">
              <SliderSeparator />
            </div>

            {/* Right Content Section */}
            <div className="w-full md:w-[30%] p-6 flex flex-col justify-between relative z-20 bg-surface">
              <SliderChannelDetails channel={currentChannel} />
              <div className="hidden md:flex items-end justify-between mt-4">
                <SliderDesktopCarousel
                  onPrevClick={prevChannel}
                  onNextClick={nextChannel}
                  currentIndex={currentChannelIndex}
                  totalItems={limitedTopChannels.length}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default SliderChannels;
