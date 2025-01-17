'use client';

import React, { useCallback } from 'react';

import { IMetaData } from '@/shared/types';

import {
  CategoryPageHeader,
  ListVideoSection,
} from '@/modules/learners/components/other-page/list-video';
import { listVideoService } from '@/modules/learners/services/list-video';
import { ICategoryInfo, IVideoDetail } from '@/modules/learners/types';

export const CategoryVideoList: React.FC<{
  category: string;
  initialVideos: IVideoDetail[];
  initialMetadata: IMetaData | null;
  categoryInfo: ICategoryInfo | null;
}> = ({ category, initialVideos, initialMetadata, categoryInfo }) => {
  const getVideosByCategory = useCallback(
    async (page: number, sortBy?: string) => {
      const response = await listVideoService.getCategoryVideos({
        page,
        size: 10,
        category: category,
        sortBy: sortBy,
      });
      return {
        data: response.data?.data || [],
        metadata: response.data?.metaData || {
          page,
          pageSize: 10,
          totalPages: 1,
          total: 0,
        },
      };
    },
    [],
  );

  return (
    <div className="relative">
      {categoryInfo && <CategoryPageHeader categoryInfo={categoryInfo} />}
      <div className="relative px-6 -top-16">
        <ListVideoSection
          initialVideos={initialVideos}
          initialMetadata={initialMetadata}
          getVideos={getVideosByCategory}
          className="bg-surface"
        />
      </div>
    </div>
  );
};
