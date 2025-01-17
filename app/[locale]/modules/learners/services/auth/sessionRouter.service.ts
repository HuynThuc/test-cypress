import { apiClient } from '@/shared/api';

import { LoginResponse } from '@/modules/helenngolang/types';

export const fetchSession = async () => {
  try {
    const response = await apiClient.get<LoginResponse>('/auth/session');
    return response;
  } catch (error) {
    return null;
  }
};

export const sessionRouterService = {
  fetchSession,
};
