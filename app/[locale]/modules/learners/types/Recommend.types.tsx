import { IListResponseBody2 } from '@/app/[locale]/shared/types';

export interface IRecommendRequest {
  videoUrl: string;
}

export interface IRecommend {
  id?: string;
  targetAudience: string;
  category: string;
  youtubeUrl: string;
  thumbnailUrl: string;
  blurThumbnailUrl: string;
  title: string;
  mode: number;
  scriptUrl: string;
  accent: string;
  cefrLevel: string;
  duration: string;
  totalViewed: string;
  isTranslated: boolean;
  isApproved: boolean;
  rawWhisperSubtitles: string;
  status: string;
  mediaWidth: number;
  mediaHeight: number;
  createdAt: string;
  updatedAt: string;
}
export interface IRecommendResponse extends IListResponseBody2<IRecommend> {}
