'use client';

import React from 'react';
import Image from 'next/image';

import { useScreenSize } from '@/shared/hook';

import RandomVideoBanner from '@/app/[locale]/modules/learners/components/landing-page/homepage/banner-section/RandomVideoBanner';

export const BannerSection = () => {
  const { lg } = useScreenSize();

  return (
    <div className="grid grid-cols-3 lg:grid-rows-[minmax(0,_1fr)_auto] grid-rows-2 auto-rows-min sm:gap-3 gap-2">
      <div
        className={
          lg
            ? 'h-full aspect-square col-span-1'
            : 'w-full aspect-[2.9/1] col-span-full'
        }
      >
        {lg ? (
          <Image
            rel="preload"
            src="/banners/randomAudioBanner.webp"
            alt="1"
            width={500}
            height={500}
            className="object-cover w-full h-full rounded block dark:hidden"
            priority
          />
        ) : (
          <Image
            rel="preload"
            src="/banners/randomAudioBannerFull.webp"
            alt="1"
            width={500}
            height={500}
            className="object-cover w-full h-full rounded block dark:hidden"
            priority
          />
        )}
        {lg ? (
          <Image
            rel="preload"
            src="/banners/randomAudioBannerDark.webp"
            alt="1"
            width={500}
            height={500}
            className="object-cover w-full h-full rounded hidden dark:block"
            priority
          />
        ) : (
          <Image
            rel="preload"
            src="/banners/randomAudioBannerFullDark.webp"
            alt="1"
            width={500}
            height={500}
            className="object-cover w-full h-full rounded hidden dark:block"
            priority
          />
        )}
      </div>
      <div className="relative lg:col-span-2 col-span-full">
        <div className="absolute w-full h-full rounded">
          <RandomVideoBanner />
        </div>
      </div>
    </div>
  );
};
