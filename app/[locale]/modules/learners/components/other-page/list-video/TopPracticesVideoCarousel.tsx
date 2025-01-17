'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { IoPlayOutline } from 'react-icons/io5';
import { PiGraduationCapFill } from 'react-icons/pi';

import { Separator } from '@/shared/components';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/shared/components/shacdn-ui/Carousel';
import { accentToString, cn, LanguageToString } from '@/shared/utils';
import { Icons } from '@/shared/components/Icon/icons';

import { ITrendingVideoDetail } from '@/modules/learners/types/VideoChannels.types';
import ListVideoBannerSeparator from '@/modules/learners/components/other-page/list-video/ListVideoBannerSeparator';

interface TopPracticeVideoCarouselProps {
  trendingVideos: ITrendingVideoDetail[];
}

export function TopPracticeVideoCarousel(
  { trendingVideos }: TopPracticeVideoCarouselProps = { trendingVideos: [] },
) {
  const t = useTranslations('Videos');

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handlePrevious = () => {
    api?.scrollPrev();
  };

  const handleNext = () => {
    api?.scrollNext();
  };

  if (trendingVideos.length === 0) return null;

  const currentItem = trendingVideos[current];

  return (
    <div className="w-full">
      <div className="bg-surface shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row md:h-80 relative">
          {/* Image Carousel (top on mobile, right on desktop) */}
          <div className="w-full md:w-[51%] md:absolute md:top-0 md:right-0 h-48 md:h-full overflow-hidden order-1 md:order-3">
            <Carousel setApi={setApi} className="w-full h-full">
              <CarouselContent className="-ml-0 h-full">
                {trendingVideos.map((video, index) => (
                  <CarouselItem key={index} className="pl-0 w-full h-full">
                    <div className="relative w-full h-full">
                      <Image
                        rel="preload"
                        src={video.thumbnailUrl}
                        alt={LanguageToString(video.title)}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        priority
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Middle separator (hidden on mobile) */}
          <div className="hidden md:block absolute inset-y-0 left-[45%] w-[10%] overflow-hidden z-20 order-2">
            <ListVideoBannerSeparator />
          </div>

          {/* Content (bottom on mobile, left on desktop) */}
          <div className="w-full md:w-[45%] p-4 flex flex-col justify-between relative z-10 order-3 md:order-1">
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center justify-start">
                <div className="flex -space-x-2 mr-2">
                  {currentItem.listPhotoUrls.slice(0, 4).map((url, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white overflow-hidden"
                    >
                      {url && (
                        <Image
                          src={url}
                          alt={`User ${i + 1}`}
                          width={32}
                          height={32}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-medium text-[#555770] text-nowrap dark:text-[#C7C9D9]">
                  +{currentItem.totalPracticedUser.toLocaleString()} users
                  practiced from this video
                </span>
              </div>
              <div className="space-y-3">
                <div className="h-[4rem] md:h-14">
                  <h5 className="text-lg md:text-xl lg:text-2xl font-bold leading-tight text-start line-clamp-2">
                    {LanguageToString(currentItem.title)}
                  </h5>
                </div>

                <div className="flex items-center justify-start space-x-4 font-medium text-xs md:text-sm text-text-secondary">
                  <div className="flex gap-2 items-center">
                    <Image
                      className="rounded object-cover h-5 w-[26px]"
                      src={`/images/en.svg`}
                      alt="English"
                      width={20}
                      height={20}
                    />
                    <span className="">
                      {t('accent')} {accentToString(currentItem.accent)}
                    </span>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="w-0.5 h-4 rounded-full bg-border/25"
                  />
                  <div className="flex gap-2 items-center text-xs">
                    <PiGraduationCapFill className="w-5 h-5 md:w-6 md:h-6" />
                    <span>{currentItem.cefrLevel}</span>
                  </div>
                </div>
                <div>
                  <Link href={currentItem.youtubeUrl} target="_blank">
                    <button className="flex gap-1 justify-center items-center bg-primary text-text-onPrimary px-3 py-1 md:px-4 md:py-2 rounded font-bold text-sm hover:bg-green-600 transition-colors">
                      <IoPlayOutline className="w-5 h-5 md:w-6 md:h-6" />
                      {t('practice')}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:flex items-end justify-between mt-4 md:mt-0 hidden">
              <div className="ml-2 flex justify-center space-x-3 text-surface">
                <button
                  onClick={handlePrevious}
                  disabled={current === 0}
                  className={cn(
                    current === 0
                      ? 'text-[#C7C9D9] dark:text-[#555770]'
                      : 'text-[#555770] dark:text-[#C7C9D9] hover:text-primary',
                  )}
                >
                  <Icons.arrowSquareLeft className="w-8 h-8" />
                </button>

                <button
                  onClick={handleNext}
                  disabled={current === count - 1}
                  className={cn(
                    current === count - 1
                      ? 'text-[#C7C9D9] dark:text-[#555770]'
                      : 'text-[#555770] dark:text-[#C7C9D9] hover:text-primary',
                  )}
                >
                  <Icons.arrowSquareRight className="w-8 h-8" />
                </button>
              </div>
              <div className="flex justify-center gap-1 items-self-end">
                {trendingVideos.map((_, index) => (
                  <div
                    key={index}
                    className={`w-6 h-1 rounded-full ${
                      index === current ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
