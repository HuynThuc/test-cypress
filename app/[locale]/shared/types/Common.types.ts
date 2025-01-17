export interface IResponseBody<T> {
  code: number;
  message: string;
  data?: T | null;
}

export interface IResponseBody2<T> {
  code: number;
  message?: string;
  data: T | null;
}
export interface IResponseBody3<T> {
  code: number;
  data: T;
}

export interface IListResponseBody<T> {
  code: number;
  message: string;
  data: ContentListResponse<T> | null;
}

export interface IListResponseBody2<T> {
  code: number;
  message?: string;
  data: T[] | null;
}

export interface IListResponseBody3rd<T> {
  code: number;
  message: string;
  data: SentenceListResponse<T> | null;
}

export type ContentListResponse<T> = {
  data: T[];
  metaData: IResponseMeta;
};

export type SentenceListResponse<T> = {
  videoId: string;
  sentences: T[];
};

export interface IResponseMeta {
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
}

export interface ITextDiffDataResponse<T> {
  score: number;
  detailData: T[];
}
