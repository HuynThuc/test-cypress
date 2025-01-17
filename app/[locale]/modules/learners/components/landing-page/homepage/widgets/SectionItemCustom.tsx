import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import CardListWrapper from '@/modules/learners/components/landing-page/homepage/widgets/CardListWrapper';
import SectionHeader from '@/modules/learners/components/landing-page/homepage/widgets/SectionHeader';

const SectionEnd = dynamic(
  () =>
    import(
      '@/modules/learners/components/landing-page/homepage/widgets/SectionEnd'
    ),
);

// Use generic for Section Props to accept any type of list
interface SectionProps<T> {
  label: string;
  listCard: T[];
  isViewAll?: boolean;
  // eslint-disable-next-line no-unused-vars
  renderItem: (item: T, index: number) => JSX.Element;
}

const Section = <T,>({
  label,
  listCard,
  isViewAll = true,
  renderItem,
}: SectionProps<T>) => {
  // Import CardListWrapper dynamically inside the component
  // eslint-disable-next-line no-unused-vars

  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const offsetWidth = scrollRef.current.offsetWidth;
      const maxScrollLeft = scrollRef.current.scrollLeft;
      scrollRef.current.scrollBy({
        left: -Math.min(offsetWidth, maxScrollLeft),
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const offsetWidth = scrollRef.current.offsetWidth;
      const maxScrollAmount =
        scrollRef.current.scrollWidth -
        scrollRef.current.scrollLeft -
        offsetWidth;
      scrollRef.current.scrollBy({
        left: Math.min(offsetWidth, maxScrollAmount),
        behavior: 'smooth',
      });
    }
  };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, offsetWidth } = scrollRef.current;
      // Set a small epsilon to handle precision errors
      const epsilon = 2;
      if (scrollWidth <= offsetWidth) {
        // No content to scroll, already at both start and end
        setAtStart(true);
        setAtEnd(true);
      } else {
        // Determine if at the start or end
        setAtStart(scrollLeft <= epsilon);
        setAtEnd(Math.abs(scrollLeft + offsetWidth - scrollWidth) < epsilon);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => checkScrollPosition();
    const currentRef = scrollRef.current;

    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
      checkScrollPosition(); // Check immediately on render
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [listCard?.length]);

  // Listener for window resize
  useEffect(() => {
    const handleResize = () => checkScrollPosition();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full">
      {/* Section Header */}
      <SectionHeader
        title={label}
        atStart={atStart}
        atEnd={atEnd}
        isViewAll={isViewAll}
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
      />
      {/* End Section Header */}
      <div className="relative w-full h-full">
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto hide-scrollbar"
        >
          <CardListWrapper list={listCard} renderItem={renderItem} />
        </div>
        {/* Gradient */}
        <SectionEnd isDisplay={atStart} side="left" />
        <SectionEnd isDisplay={atEnd} side="right" />
      </div>
    </div>
  );
};

export default Section;
