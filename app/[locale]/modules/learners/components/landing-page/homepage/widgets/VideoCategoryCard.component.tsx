import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

import { useGetCurrentLocale, useScreenSize } from '@/shared/hook';

import { IVideoCategory } from '@/modules/learners/types';
import { RootState } from '@/modules/learners/store';

interface VideoCategoryCardProps {
  category: IVideoCategory;
}

export const VideoCategoryCard = ({ category }: VideoCategoryCardProps) => {
  const isCollapsedSideNav = useSelector(
    (state: RootState) => state.collapsedSidenav.isCollapsed,
  );
  const { xl } = useScreenSize();
  const locale = useGetCurrentLocale();

  return (
    <Link
      href={`/videos/c/${category.value}`}
      className={`block relative cursor-pointer select-none rounded overflow-hidden object-cover ${isCollapsedSideNav && xl ? 'h-[132px] w-80' : 'h-[100px] w-60'}`}
    >
      <Image
        src={category.artworkPlainImage}
        alt="genre card"
        width={640}
        height={264}
        quality={100}
        className="w-auto h-full relative"
      />
      <p
        className={`absolute font-semibold leading-[22px] text-white tracking-[2px] ${isCollapsedSideNav && xl ? 'top-4 left-4 h-[100px] w-[184px] text-lg' : 'top-3 left-3 h-[76px] w-36 text-sm leading-[17px]'}`}
      >
        {category.title[locale].toUpperCase()}
      </p>
    </Link>
  );
};
