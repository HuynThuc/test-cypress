'use client';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { OnCloseProps } from '@/app/[locale]/shared/types';

import { useErrorHandler } from '../../../shared/hook';
import { DEFAULT_PAGE, MAX_PAGE_SIZE } from '../../../shared/constants';
import { helenShortSpeakingService } from '../services';
import {
  IGetAllHelenShortSpeakingCategoryRequest,
  IGetAllHelenShortSpeakingRequest,
  IGetAllHelenShortSpeakingTagRequest,
} from '../types';

// Helen Short Speaking
export function useGetAllHelenShortSpeaking(
  req: IGetAllHelenShortSpeakingRequest,
) {
  const { handle } = useErrorHandler();
  const {
    data: resp,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_ALL_HELEN_SHORT_SPEAKING',
    queryFn: () => helenShortSpeakingService.getAllHelenShortSpeaking(req),
    refetchInterval: 1000 * 60 * 10, // 10 minutes
    onError: handle,
  });

  return {
    data: resp?.data?.data ?? [],
    meta: resp?.data?.metaData,
    isFetching,
    isSuccess,
    refetch,
  };
}

export function useCreateHelenShortSpeaking({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenShortSpeakingService.createHelenShortSpeaking,
    mutationKey: 'CREATE_HELEN_SHORT_SPEAKING',
    onSuccess: async () => {
      toast.success('Create successfully');
      await queryClient.invalidateQueries('GET_ALL_HELEN_SHORT_SPEAKING');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}

export function useUpdateHelenShortSpeaking({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenShortSpeakingService.updateHelenShortSpeaking,
    mutationKey: 'UPDATE_HELEN_SHORT_SPEAKING',
    onSuccess: async () => {
      toast.success('Update successfully');
      await queryClient.invalidateQueries('GET_ALL_HELEN_SHORT_SPEAKING');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}

export function useDeleteHelenShortSpeaking({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenShortSpeakingService.deleteHelenShortSpeaking,
    mutationKey: 'DELETE_HELEN_SHORT_SPEAKING',
    onSuccess: async () => {
      toast.success('Delete successfully');
      await queryClient.invalidateQueries('GET_ALL_HELEN_SHORT_SPEAKING');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}

export function useUpdateActiveHelenShortSpeaking({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenShortSpeakingService.updateActiveHelenShortSpeaking,
    mutationKey: ['UPDATE_ACTIVE_HELEN_SHORT_SPEAKING'],
    onSuccess: async () => {
      toast.success('Update active successfully');
      await queryClient.invalidateQueries('GET_ALL_HELEN_SHORT_SPEAKING');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}

export function useUpdateInactiveHelenShortSpeaking({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenShortSpeakingService.updateInactiveHelenShortSpeaking,
    mutationKey: ['UPDATE_INACTIVE_HELEN_SHORT_SPEAKING'],
    onSuccess: async () => {
      toast.success('Update active successfully');
      await queryClient.invalidateQueries('GET_ALL_HELEN_SHORT_SPEAKING');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}

// Helen Short Speaking Category
export function useGetAllHelenShortSpeakingCategory(enabled?: boolean) {
  const { handle } = useErrorHandler();
  const {
    data: resp,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_ALL_HELEN_SHORT_SPEAKING_CATEGORY',
    queryFn: () =>
      helenShortSpeakingService.getAllHelenShortSpeakingCategory({
        page: DEFAULT_PAGE,
        limit: MAX_PAGE_SIZE,
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

export function useGetHelenShortSpeakingCategory(
  req: IGetAllHelenShortSpeakingCategoryRequest,

  enabled?: boolean,
) {
  const { handle } = useErrorHandler();
  const {
    data: resp,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_HELEN_SHORT_SPEAKING_CATEGORY',
    queryFn: () =>
      helenShortSpeakingService.getAllHelenShortSpeakingCategory(req),
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

export function useCreateHelenShortSpeakingCategory({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenShortSpeakingService.createHelenShortSpeakingCategory,
    mutationKey: 'CREATE_HELEN_SHORT_SPEAKING_CATEGORY',
    onSuccess: async () => {
      toast.success('Create successfully');
      await queryClient.invalidateQueries(
        'GET_ALL_HELEN_SHORT_SPEAKING_CATEGORY',
      );
      await queryClient.invalidateQueries('GET_HELEN_SHORT_SPEAKING_CATEGORY');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}

export function useDeleteHelenShortSpeakingCategory({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenShortSpeakingService.deleteHelenShortSpeakingCategory,
    mutationKey: 'DELETE_HELEN_SHORT_SPEAKING_CATEGORY',
    onSuccess: async () => {
      toast.success('Delete successfully');
      await queryClient.invalidateQueries(
        'GET_ALL_HELEN_SHORT_SPEAKING_CATEGORY',
      );
      await queryClient.invalidateQueries('GET_HELEN_SHORT_SPEAKING_CATEGORY');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}

// Helen Short Speaking Tag
export function useGetAllHelenShortSpeakingTag(enabled?: boolean) {
  const { handle } = useErrorHandler();
  const {
    data: resp,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_ALL_HELEN_SHORT_SPEAKING_TAG',
    queryFn: () =>
      helenShortSpeakingService.getAllHelenShortSpeakingTag({
        page: DEFAULT_PAGE,
        limit: MAX_PAGE_SIZE,
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

export function useGetHelenShortSpeakingTag(
  req: IGetAllHelenShortSpeakingTagRequest,
) {
  const { handle } = useErrorHandler();
  const {
    data: resp,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_HELEN_SHORT_SPEAKING_TAG',
    queryFn: () => helenShortSpeakingService.getAllHelenShortSpeakingTag(req),
    onError: handle,
  });

  return {
    data: resp?.data?.data ?? [],
    meta: resp?.data?.metaData,
    isFetching,
    isSuccess,
    refetch,
  };
}

export function useCreateHelenShortSpeakingTag({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenShortSpeakingService.createHelenShortSpeakingTag,
    mutationKey: 'CREATE_HELEN_SHORT_SPEAKING_TAG',
    onSuccess: async () => {
      toast.success('Create successfully');
      await queryClient.invalidateQueries('GET_ALL_HELEN_SHORT_SPEAKING_TAG');
      await queryClient.invalidateQueries('GET_HELEN_SHORT_SPEAKING_TAG');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}

export function useDeleteHelenShortSpeakingTag({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenShortSpeakingService.deleteHelenShortSpeakingTag,
    mutationKey: 'DELETE_HELEN_SHORT_SPEAKING_TAG',
    onSuccess: async () => {
      toast.success('Delete successfully');
      await queryClient.invalidateQueries('GET_ALL_HELEN_SHORT_SPEAKING_TAG');
      await queryClient.invalidateQueries('GET_HELEN_SHORT_SPEAKING_TAG');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}
