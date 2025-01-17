import { handleFilterParams } from '@/app/[locale]/shared/utils/api-routes.utils';

import { apiClient } from '../../../shared/api';
import { HELPER_API_ROUTES } from '../utils';
import {
  ISystemQuote,
  IListSystemQuoteResponse,
  IListSystemQuoteCategoryResponse,
  IGetAllSystemQuoteCategoryRequest,
} from '../types';
import { SystemQuoteSchema } from '../schema';

async function createSystemQuote(req: SystemQuoteSchema) {
  return apiClient.post(`${HELPER_API_ROUTES.SYSTEM_QUOTE}`, req);
}

async function getAllSystemQuote(
  page: number,
  limit: number,
  debouncedValue: string,
  filterCategory: string,
  filterStatus: string,
): Promise<IListSystemQuoteResponse> {
  return apiClient.post(HELPER_API_ROUTES.GET_ALL_SYSTEM_QUOTE, {
    page: page,
    limit: limit,
    quote: debouncedValue,
    category: filterCategory,
    status: filterStatus,
  });
}

async function updateSystemQuote(req: SystemQuoteSchema) {
  return apiClient.post(HELPER_API_ROUTES.SYSTEM_QUOTE, req);
}
async function deleteSystemQuote(id: string) {
  return apiClient.delete(`${HELPER_API_ROUTES.SYSTEM_QUOTE}/${id}`);
}
async function updateActiveSystemquote(id: string) {
  return apiClient.put(`${HELPER_API_ROUTES.SYSTEM_QUOTE}/active/${id}`, {});
}

async function updateInactiveSystemQuote(id: string) {
  return apiClient.put(`${HELPER_API_ROUTES.SYSTEM_QUOTE}/inactive/${id}`, {});
}
// System Quote Category
async function getAllSystemQuoteCategory(
  req: IGetAllSystemQuoteCategoryRequest,
): Promise<IListSystemQuoteCategoryResponse> {
  return apiClient.post(
    HELPER_API_ROUTES.GET_ALL_SYSTEM_QUOTE_CATEGORY,
    handleFilterParams(req),
  );
}

function mapInterfaceToFormSchema(req: ISystemQuote): SystemQuoteSchema {
  return {
    category: req.category,
    quote: req.quote,
    author: req.author,

    id: req.id,
  };
}

export const systemQuoteService = {
  createSystemQuote,
  getAllSystemQuote,
  updateSystemQuote,
  deleteSystemQuote,

  updateActiveSystemquote,
  updateInactiveSystemQuote,

  getAllSystemQuoteCategory,
  mapInterfaceToFormSchema,
};
