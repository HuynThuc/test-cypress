/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';

import { useScreenSize } from '@/shared/hook';

import { ISubtitle } from '@/modules/learners/types/video-detail/VideoDetail.types';
import SubtitleItem from '@/modules/learners/components/other-page/learn/transcript/widget/SubtitleItem';

interface SubtitleListProps {
  subtitles: ISubtitle[];
  activeSubtitleIndex: number | null;
  handleSubtitleClick: (time: number) => void;
}

export default function SubtitleList({
  subtitles,
  activeSubtitleIndex,
  handleSubtitleClick,
}: SubtitleListProps) {
  const subtitleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null); // Ref for the container
  const { md } = useScreenSize();
  useEffect(() => {
    if (
      activeSubtitleIndex !== null &&
      subtitleRefs.current[activeSubtitleIndex]
    ) {
      const currentElement = subtitleRefs.current[activeSubtitleIndex];
      const containerElement = containerRef.current;
      if (currentElement && containerElement) {
        // Get the position of the element within the container
        const elementOffsetTop = currentElement.offsetTop;
        const containerScrollTop = containerElement.scrollTop;
        const containerHeight = containerElement.clientHeight;
        const scrollBottom = md
          ? containerScrollTop + 200
          : containerScrollTop + 400;
        // Check if the element is not completely within the visible area of the container
        if (
          elementOffsetTop < scrollBottom ||
          elementOffsetTop + currentElement.clientHeight >
            scrollBottom + containerHeight
        ) {
          // Scroll the container to the position of the element to be displayed
          containerElement.scrollTo({
            top: md ? elementOffsetTop - 250 : elementOffsetTop - 400,
            behavior: 'smooth',
          });
        }
      }
    }
  }, [activeSubtitleIndex]);

  return (
    <div
      ref={containerRef}
      className="overflow-x-hidden space-y-4 md:h-[calc(70vh-20px)] h-[calc(52vh-20px)] md:min-h-[335px] md:max-h-[690px] overflow-y-auto scrollbar-transparent overscroll-contain"
    >
      <div className="bg-surface rounded-lg h-full w-full">
        <div className="h-full w-full rounded-lg flex flex-col gap-4">
          {subtitles.map((subtitle, index) => (
            <div
              key={index}
              ref={(el) => {
                subtitleRefs.current[index] = el;
              }}
            >
              <SubtitleItem
                index={index}
                handleSubtitleClick={handleSubtitleClick}
                subtitle={subtitle}
                isActive={index === activeSubtitleIndex}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
