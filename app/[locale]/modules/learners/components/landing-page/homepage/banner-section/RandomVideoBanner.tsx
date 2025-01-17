'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CustomCarouselNext,
  CustomCarouselPrevious,
} from '@/shared/components/shacdn-ui/Carousel';
import { useScreenSize } from '@/shared/hook';

const bannerItems = [
  {
    title: 'Not Sure Where to Start?',
    description: "Choose Play Something and we'll pick things for you.",
    buttonText: 'Play Something',
    backgroundImage: 'randomVideoBanner',
  },
  {
    title: 'Explore New Content',
    description: 'Discover our latest lessons and materials.',
    buttonText: 'Explore Now',
    backgroundImage: 'randomVideoBanner',
  },
  {
    title: 'Practice Your Skills',
    description: 'Try our interactive exercises to improve your English.',
    buttonText: 'Start Practice',
    backgroundImage: 'randomVideoBanner',
  },
  {
    title: 'Join Live Classes',
    description: 'Participate in real-time lessons with our expert teachers.',
    buttonText: 'Join Now',
    backgroundImage: 'randomVideoBanner',
  },
];

export default function RandomVideoBanner() {
  const { lg } = useScreenSize();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className="w-full h-full relative"
      opts={{
        loop: true,
      }}
    >
      <CarouselContent className="h-full">
        {bannerItems.map((item, idx) => (
          <CarouselItem key={idx} className="h-full">
            <div className="relative w-full h-full">
              <Image
                src={`/banners/${item.backgroundImage}${lg ? '.webp' : 'Full.svg'}`}
                alt={item.title}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded overflow-hidden"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CustomCarouselPrevious />
      <CustomCarouselNext />
      <div className="flex gap-1.5 absolute w-fit h-fit bottom-3 right-3">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-0 rounded-full content-none ${
              index === current ? 'bg-text-light' : 'bg-background'
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </Carousel>
  );
}
