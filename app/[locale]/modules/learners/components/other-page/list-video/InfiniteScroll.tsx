import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface InfiniteScrollProps {
  children: React.ReactNode;
  loadMore: () => void;
  hasMore: boolean;
  loader: React.ReactNode;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  loadMore,
  hasMore,
  loader,
}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore) {
      loadMore();
    }
  }, [inView, hasMore]);

  return (
    <div className="flex flex-col gap-6">
      {children}
      {hasMore && (
        <div
          ref={ref}
          className="w-full grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-y-6 gap-x-4 px-1 justify-items-stretch"
        >
          {loader}
        </div>
      )}
    </div>
  );
};
