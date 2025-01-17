'use client';

import { useQuery } from 'react-query';

import { useErrorHandler } from '@/shared/hook';

import { videoCategoryService } from '@/modules/learners/services/landing';

export function useGetAllVideoCategories(params: string) {
  const { handle } = useErrorHandler();
  const {
    data: resp,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ['GET_ALL_VIDEO_CATEGORIES', params],
    queryFn: () => videoCategoryService.getAllVideoCategories(),
    onError: handle,
  });

  return {
    data: resp?.data ?? [],
    isFetching,
    isSuccess,
    refetch,
  };
}
