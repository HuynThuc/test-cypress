import { IListResponseBody } from '../../../shared/types';

export interface IGetAllHelenShortSpeakingRequest {
  page: number;
  limit: number;

  title?: string;
  status?: string;
  targetAudience?: string;
  category?: string;
  tags?: string;
  imageUrl?: string;
  scriptUrl?: string;
  mp3Url?: string;
  refUrl?: string;
}

export interface IGetAllHelenShortSpeakingTagRequest {
  page: number;
  limit: number;

  title?: string;
}

export interface IGetAllHelenShortSpeakingCategoryRequest {
  page: number;
  limit: number;

  title?: string;
}

export interface IHelenShortSpeaking {
  title: string;
  status: string;
  targetAudience: string;
  category: string;
  tags: string;
  imageUrl: string;
  scriptUrl: string;
  mp3Url: string;
  refUrl: string;

  id?: string;
}

export interface IListHelenShortSpeakingResponse
  extends IListResponseBody<IHelenShortSpeaking> {}

export interface IHelenShortSpeakingCategory {
  value: string;
  title: string;
  color: string;
  iconUrl: string;

  id?: string;
}

export interface IListHelenShortSpeakingCategoryResponse
  extends IListResponseBody<IHelenShortSpeakingCategory> {}

export interface IHelenShortSpeakingTag {
  value: string;
  title: string;
  color: string;
  iconUrl: string;

  id?: string;
}

export interface IListHelenShortSpeakingTagResponse
  extends IListResponseBody<IHelenShortSpeakingTag> {}
