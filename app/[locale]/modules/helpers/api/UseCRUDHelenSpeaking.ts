'use client';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { useErrorHandler } from '../../../shared/hook';
import { OnCloseProps } from '../../../shared/types';
import { DEFAULT_PAGE, MAX_PAGE_SIZE } from '../../../shared/constants';
import { helenSpeakingService } from '../services';
import {
  IGetAllHelenSpeakingCategoryRequest,
  IGetAllHelenSpeakingRequest,
  IGetAllHelenSpeakingTagRequest,
} from '../types';

// Helen Speaking
export function useGetAllHelenSpeaking(req: IGetAllHelenSpeakingRequest) {
  const { handle } = useErrorHandler();
  const {
    data: resp,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_ALL_HELEN_SPEAKING',
    queryFn: () => helenSpeakingService.getAllHelenSpeaking(req),
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

export function useCreateHelenSpeaking({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenSpeakingService.createHelenSpeaking,
    mutationKey: 'CREATE_HELEN_SPEAKING',
    onSuccess: async () => {
      toast.success('Create successfully');
      await queryClient.invalidateQueries('GET_ALL_HELEN_SPEAKING');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}

export function useUpdateHelenSpeaking({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenSpeakingService.updateHelenSpeaking,
    mutationKey: 'UPDATE_HELEN_SPEAKING',
    onSuccess: async () => {
      toast.success('Update successfully');
      await queryClient.invalidateQueries('GET_ALL_HELEN_SPEAKING');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}

export function useDeleteHelenSpeaking({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenSpeakingService.deleteHelenSpeaking,
    mutationKey: 'DELETE_HELEN_SPEAKING',
    onSuccess: async () => {
      toast.success('Delete successfully');
      await queryClient.invalidateQueries('GET_ALL_HELEN_SPEAKING');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}

export function useUpdateActiveHelenSpeaking({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenSpeakingService.updateActiveHelenSpeaking,
    mutationKey: 'UPDATE_ACTIVE_HELEN_SPEAKING',
    onSuccess: async () => {
      toast.success('Update active successfully');
      await queryClient.invalidateQueries('GET_ALL_HELEN_SPEAKING');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}

export function useUpdateInactiveHelenSpeaking({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenSpeakingService.updateInactiveHelenSpeaking,
    mutationKey: 'UPDATE_INACTIVE_HELEN_SPEAKING',
    onSuccess: async () => {
      toast.success('Update active successfully');
      await queryClient.invalidateQueries('GET_ALL_HELEN_SPEAKING');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}

// Helen Speaking Category
export function useGetAllHelenSpeakingCategory(enabled?: boolean) {
  const { handle } = useErrorHandler();
  const {
    data: resp,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_ALL_HELEN_SPEAKING_CATEGORY',
    queryFn: () =>
      helenSpeakingService.getAllHelenSpeakingCategory({
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

export function useGetHelenSpeakingCategory(
  req: IGetAllHelenSpeakingCategoryRequest,

  enabled?: boolean,
) {
  const { handle } = useErrorHandler();
  const {
    data: resp,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_HELEN_SPEAKING_CATEGORY',
    queryFn: () => helenSpeakingService.getAllHelenSpeakingCategory(req),
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

export function useCreateHelenSpeakingCategory({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenSpeakingService.createHelenSpeakingCategory,
    mutationKey: 'CREATE_HELEN_SPEAKING_CATEGORY',
    onSuccess: async () => {
      toast.success('Create successfully');
      await queryClient.invalidateQueries('GET_ALL_HELEN_SPEAKING_CATEGORY');
      await queryClient.invalidateQueries('GET_HELEN_SPEAKING_CATEGORY');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}

export function useDeleteHelenSpeakingCategory({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenSpeakingService.deleteHelenSpeakingCategory,
    mutationKey: 'DELETE_HELEN_SPEAKING_CATEGORY',
    onSuccess: async () => {
      toast.success('Delete successfully');
      await queryClient.invalidateQueries('GET_ALL_HELEN_SPEAKING_CATEGORY');
      await queryClient.invalidateQueries('GET_HELEN_SPEAKING_CATEGORY');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}

// Helen Speaking Tag
export function useGetAllHelenSpeakingTag(enabled?: boolean) {
  const { handle } = useErrorHandler();
  const {
    data: resp,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_ALL_HELEN_SPEAKING_TAG',
    queryFn: () =>
      helenSpeakingService.getAllHelenSpeakingTag({
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

export function useGetHelenSpeakingTag(req: IGetAllHelenSpeakingTagRequest) {
  const { handle } = useErrorHandler();
  const {
    data: resp,
    isFetching,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: 'GET_HELEN_SPEAKING_TAG',
    queryFn: () => helenSpeakingService.getAllHelenSpeakingTag(req),
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

export function useCreateHelenSpeakingTag({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenSpeakingService.createHelenSpeakingTag,
    mutationKey: 'CREATE_HELEN_SPEAKING_TAG',
    onSuccess: async () => {
      toast.success('Create successfully');
      await queryClient.invalidateQueries('GET_ALL_HELEN_SPEAKING_TAG');
      await queryClient.invalidateQueries('GET_HELEN_SPEAKING_TAG');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}

export function useDeleteHelenSpeakingTag({ onClose }: OnCloseProps) {
  const queryClient = useQueryClient();
  const { handle } = useErrorHandler();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn: helenSpeakingService.deleteHelenSpeakingTag,
    mutationKey: 'DELETE_HELEN_SPEAKING_TAG',
    onSuccess: async () => {
      toast.success('Delete successfully');
      await queryClient.invalidateQueries('GET_ALL_HELEN_SPEAKING_TAG');
      await queryClient.invalidateQueries('GET_HELEN_SPEAKING_TAG');
      onClose();
    },
    onError: async (error) => {
      handle(error);
      onClose();
    },
  });

  return { mutate, isLoading, isSuccess };
}
