import { IListResponseBody } from '../../../shared/types';

export interface IGetAllHelenSpeakingRequest {
  page: number;
  limit: number;

  title?: string;
  status?: string;
  targetAudience?: string;
  category?: string;
  tags?: string;
  youtubeUrl?: string;
  mode?: string;
}

export interface IGetAllHelenSpeakingTagRequest {
  page: number;
  limit: number;

  title?: string;
}

export interface IGetAllHelenSpeakingCategoryRequest {
  page: number;
  limit: number;

  title?: string;
}

export interface IHelenSpeaking {
  title: string;
  status: string;
  targetAudience: string;
  category: string;
  tags: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  blurThumbnailUrl: string;
  scriptUrl: string;
  mode: string;

  id?: string;
}

export interface IListHelenSpeakingResponse
  extends IListResponseBody<IHelenSpeaking> {}

export interface IHelenSpeakingCategory {
  value: string;
  title: string;
  color: string;
  iconUrl: string;

  id?: string;
}

export interface IListHelenSpeakingCategoryResponse
  extends IListResponseBody<IHelenSpeakingCategory> {}

export interface IHelenSpeakingTag {
  value: string;
  title: string;
  color: string;
  iconUrl: string;

  id?: string;
}

export interface IListHelenSpeakingTagResponse
  extends IListResponseBody<IHelenSpeakingTag> {}
