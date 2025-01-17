import { apiClient } from '../../../shared/api';
import { IListHelperHistoryActionResponse } from '../types';
import { ADMIN_API_ROUTES } from '../utils';

async function getAllHelperHistoryAction(
  page: number,
  limit: number,
  debouncedValue: string,
  filterCategory: string,
  filterStatus: string,
): Promise<IListHelperHistoryActionResponse> {
  return apiClient.post(ADMIN_API_ROUTES.GET_ALL_HELPER_HISTORY_ACTIONS, {
    page: page,
    limit: limit,
    title: debouncedValue,
    category: filterCategory,
    status: filterStatus,
  });
}

export const helperHistoryActionService = {
  getAllHelperHistoryAction,
};
