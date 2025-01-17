import React from 'react';

export const SkeletonVideoItem: React.FC = () => {
  return (
    <div className="flex flex-col justify-between w-full min-w-[240px] aspect-video relative">
      <div className="flex flex-col gap-2">
        <div className="relative">
          <div className="rounded-[4px] max-h-[136px] min-h-[135px] bg-gray-200 animate-pulse" />
          <div className="absolute bottom-2 right-2 w-8 h-5 bg-gray-300 rounded-[4px] animate-pulse" />
        </div>
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
        <div className="w-full flex items-center justify-between">
          <div className="w-16 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
          <div className="w-1 h-1 bg-gray-300 rounded-full" />
          <div className="w-16 h-6 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
