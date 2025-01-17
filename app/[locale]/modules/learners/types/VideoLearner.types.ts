import { ApiResponse, ApiResponse2, ITitleLocale } from '@/shared/types';

export interface IVideoDetail {
  id?: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  blurThumbnailUrl: string;
  title: ITitleLocale;
  accent: string;
  cefrLevel: string;
  duration: number;
  durationText: string;
  totalViewed: number;
}

export interface IVideoQueryParams {
  page: number;
  limit: number;
  channel?: string;
  search?: string;
  sortBy?: string;
  accent?: string;
  duration?: string;
  level?: string;
}

export interface IGetVideoLearnersResponse
  extends ApiResponse<IVideoDetail[]> {}
export interface IGetVideoTrendingResponse
  extends ApiResponse2<IVideoDetail[]> {}
