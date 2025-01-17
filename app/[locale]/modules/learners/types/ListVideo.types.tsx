import {
  IListResponseBody,
  IListResponseBody2,
} from '@/app/[locale]/shared/types';

export interface IGetAllListVideo {
  id?: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  blurThumbnailUrl: string;
  title: string;
  accent: string;
  cefrLevel: string;
  duration: string;
  durationText: string;
  totalViewed: string;
}
export interface IGetAllListVideoRequest {
  page: number;
  limit: number;
  channel?: string;
  search?: string;
  sortBy?: string;
}
export interface IGetAllListVideoResponse
  extends IListResponseBody<IGetAllListVideo> {}

export interface IGetRecommendVideo {
  id: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  blurThumbnailUrl: string;
  title: string;
  accent: string;
  cefrLevel: string;
  duration: string;
  durationText: string;
  totalViewed: string;
}
export interface IGetRecommendListVideoResponse
  extends IListResponseBody2<IGetRecommendVideo> {}
