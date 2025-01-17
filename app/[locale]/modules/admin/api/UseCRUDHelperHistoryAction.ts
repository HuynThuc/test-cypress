'use client';
import { useQuery } from 'react-query';

import { useErrorHandler } from '../../../shared/hook';
import { helperHistoryActionService } from '../services';

export function useGetAllHelperHistoryAction(
  page: number = 1,
  limit: number = 10,
  debouncedValue: string,
  filterCategory: string,
  filterStatus: string,
) {
  const { handle } = useErrorHandler();
  const {
    data: resp,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_ALL_HELEN_SHORT_SPEAKING',
    async queryFn() {
      return await helperHistoryActionService.getAllHelperHistoryAction(
        page,
        limit,
        debouncedValue,
        filterCategory,
        filterStatus,
      );
    },
    onError: handle,
  });

  return {
    data: resp?.data?.data ?? [],
    meta: resp?.data?.metaData,
    isSuccess,
    refetch,
  };
}
