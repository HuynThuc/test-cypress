import { IListResponseBody } from '../../../shared/types';

export interface IGetAllSystemQuoteRequest {
  page: number;
  limit: number;

  quote?: string;
  category?: string;
  author?: string;
  status?: string;
}
export interface IGetAllSystemQuoteCategoryRequest {
  page: number;
  limit: number;
  category: string;
}
export interface ISystemQuote {
  category: string;
  quote: string;
  author: string;
  status: string;
  id?: string;
}

export interface IListSystemQuoteResponse
  extends IListResponseBody<ISystemQuote> {}

export interface ISystemQuoteCategory {
  category: string;
}

export interface IListSystemQuoteCategoryResponse
  extends IListResponseBody<ISystemQuoteCategory> {}

export interface ISystemQuoteCategory {
  value: string;
  title: string;
  color: string;
  iconUrl: string;

  id?: string;
}
