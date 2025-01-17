import { apiClient } from '@/shared/api';

import { LEARNER_APP_ROUTES } from '@/modules/learners/utils/api-app-routes';
import { ISearchResponse } from '@/modules/learners/types/Search.types';

export const fetchSearch = async (
  text: string,
  page: number,
  limit: number,
): Promise<ISearchResponse | null> => {
  try {
    const response = await apiClient.get<{ data: ISearchResponse }>(
      `${LEARNER_APP_ROUTES.SEARCH}?text=${text}&page=${page}&limit=${limit}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
