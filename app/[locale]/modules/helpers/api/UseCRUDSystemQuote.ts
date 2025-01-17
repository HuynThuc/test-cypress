import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import {
  DEFAULT_PAGE,
  MAX_PAGE_SIZE,
} from '@/app/[locale]/shared/constants/DataTable.constants';

import { useErrorHandler } from '../../../shared/hook';
import { systemQuoteService } from '../services';
import { IGetAllSystemQuoteCategoryRequest } from '../types/SystemQuote.types';

type Props = {
  onClose: () => void;
};

export function useGetAllSystemQuote(
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
    queryKey: 'GET_ALL_SYSTEM_QUOTE',
    async queryFn() {
      return await systemQuoteService.getAllSystemQuote(
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

export function useCreateSystemQuote({ onClose }: Props) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isSuccess, isLoading } = useMutation({
    mutationFn: systemQuoteService.createSystemQuote,
    mutationKey: ['CREATE_HELEN_SHORT_SPEAKING'],
    onSuccess: async () => {
      toast.success('Create successfully');
      await queryClient.invalidateQueries('GET_ALL_SYSTEM_QUOTE');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isSuccess, isLoading };
}

export function useUpdateSystemQuote({ onClose }: Props) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isSuccess, isLoading } = useMutation({
    mutationFn: systemQuoteService.updateSystemQuote,
    mutationKey: ['UPDATE_SYSTEM_QUOTE'],
    onSuccess: async () => {
      toast.success('Update successfully');
      await queryClient.invalidateQueries('GET_ALL_SYSTEM_QUOTE');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isSuccess, isLoading };
}

export function useDeleteSystemQuote({ onClose }: Props) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isSuccess, isLoading } = useMutation({
    mutationFn: systemQuoteService.deleteSystemQuote,
    mutationKey: ['DELETE_SYSTEM_QUOTE'],
    onSuccess: async () => {
      toast.success('Delete successfully');
      await queryClient.invalidateQueries('GET_ALL_SYSTEM_QUOTE');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isSuccess, isLoading };
}

export function useUpdateActiveSystemQuote({ onClose }: Props) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isSuccess, isLoading } = useMutation({
    mutationFn: systemQuoteService.updateActiveSystemquote,
    mutationKey: ['UPDATE_ACTIVE_SYSTEM_QUOTE'],
    onSuccess: async () => {
      toast.success('Update active successfully');
      await queryClient.invalidateQueries('GET_ALL_SYSTEM_QUOTE');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isSuccess, isLoading };
}

export function useUpdateInactiveSystemQuote({ onClose }: Props) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isSuccess, isLoading } = useMutation({
    mutationFn: systemQuoteService.updateInactiveSystemQuote,
    mutationKey: ['UPDATE_INACTIVE_SYSTEM_QUOTE'],
    onSuccess: async () => {
      toast.success('Update inactive successfully');
      await queryClient.invalidateQueries('GET_ALL_SYSTEM_QUOTE');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isSuccess, isLoading };
}

// System Quote Category

export function useGetAllSystemQuoteCategory(enabled?: boolean) {
  const { handle } = useErrorHandler();
  const {
    data: resp,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_ALL_SYSTEM_QUOTE_CATEGORY',
    queryFn: () =>
      systemQuoteService.getAllSystemQuoteCategory({
        page: DEFAULT_PAGE,
        limit: MAX_PAGE_SIZE,
        category: '',
      }),
    onError: handle,
    enabled,
  });

  return {
    data: resp?.data?.data ?? [],
    meta: resp?.data?.metaData,
    isFetching,
    isSuccess,
    refetch,
  };
}

export function useGetSystemQuoteCategory(
  req: IGetAllSystemQuoteCategoryRequest,
  enabled?: boolean,
) {
  const { handle } = useErrorHandler();
  const {
    data: resp,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_SYSTEM_QUOTE_CATEGORY',
    queryFn: () => systemQuoteService.getAllSystemQuoteCategory(req),
    onError: handle,
    enabled,
  });

  return {
    data: resp?.data?.data ?? [],
    meta: resp?.data?.metaData,
    isFetching,
    isSuccess,
    refetch,
  };
}
