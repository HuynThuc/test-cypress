'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { PiShootingStar } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';

import { cn, LanguageToString } from '@/shared/utils';

import { setActiveCategory } from '@/modules/learners/store/slice';
import { RootState } from '@/modules/learners/store';

interface CategoryTabProps {
  title: string;
  value: string;
  isActive: boolean;
  isForYou?: boolean;
}

const CategoryTab: React.FC<CategoryTabProps> = React.memo(
  ({ title, value, isActive, isForYou }) => {
    const path = isForYou ? `/videos` : `/videos/c/${value}`;
    return (
      <Link href={path} passHref>
        <motion.div
          className={cn(
            `flex space-x-2 px-6 py-3 rounded cursor-pointer whitespace-nowrap hover:bg-surface hover:text-primary`,
            isActive
              ? 'bg-surface border-2 border-primary text-primary shadow-e3'
              : 'bg-border/[.12] text-border',
          )}
        >
          {isForYou && <PiShootingStar className="w-6 h-6" />}
          <span
            className={cn(
              'text-base h-6',
              isActive ? 'font-bold' : 'font-medium',
            )}
          >
            {title}
          </span>
        </motion.div>
      </Link>
    );
  },
);

CategoryTab.displayName = 'CategoryTab';

export const CategorySlider: React.FC = React.memo(() => {
  const { categories, activeCategory } = useSelector(
    (state: RootState) => state.videoCategory,
  );

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const dispatch = useDispatch();

  const t = useTranslations('Videos');

  const scroll = useCallback((scrollOffset: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
      updateArrows();
    }
  }, []);

  const updateArrows = useCallback(() => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [updateArrows]);

  useEffect(() => {
    const pathParts = pathname.split('/').filter((part) => part !== '');
    if (pathParts.includes('c')) {
      const category = pathParts[pathParts.length - 1];
      dispatch(setActiveCategory(category));
    } else if (pathParts.includes('videos') && !pathParts.includes('c')) {
      dispatch(setActiveCategory('for-you'));
    }
  }, [pathname]);

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="relative flex items-center">
      <div
        className={cn(
          `absolute left-0 top-0 h-full z-10 transition-opacity duration-200 flex`,
          showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        <button
          onClick={() => scroll(-200)}
          className="p-3 bg-background"
          disabled={!showLeftArrow}
        >
          <HiChevronLeft className="w-6 h-6 text-text-light" />
        </button>
        <div className="w-3 h-full bg-gradient-to-r from-background to-transparent"></div>
      </div>
      <div
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide space-x-4 py-2 items-center"
        onScroll={updateArrows}
      >
        <CategoryTab
          title={t('defaultTab')}
          value="for-you"
          isActive={activeCategory === 'for-you'}
          isForYou={true}
        />
        {categories.map((category) => (
          <CategoryTab
            key={category.value}
            title={LanguageToString(category.title)}
            value={category.value}
            isActive={activeCategory === category.value}
          />
        ))}
      </div>
      <div
        className={cn(
          `absolute right-0 top-0 h-full z-10 transition-opacity duration-200 flex`,
          showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
      >
        <div className="w-3 h-full bg-gradient-to-l from-background to-transparent"></div>
        <button
          onClick={() => scroll(200)}
          className="p-3 bg-background"
          disabled={!showRightArrow}
        >
          <HiChevronRight className="w-6 h-6 text-text-light" />
        </button>
      </div>
    </div>
  );
});
