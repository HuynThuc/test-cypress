import {
  ApiResponse,
  ApiResponse2,
  ITitleLocale,
  ResponseData,
} from '@/shared/types';

import { IVideoDetail } from '@/modules/learners/types';

export interface IChannelDetail {
  id: string;
  channelId: string;
  title: string;
  description: string;
  avatarUrl: string;
  bannerUrl: string;
  totalVideosCount: number;
  totalPracticedUser: number;
}

export interface IChannelVideoList {
  channel: IChannelDetail;
  videos: IVideoDetail[];
}

export interface ICategoryInfo extends ICategory {
  title: ITitleLocale;
  description: ITitleLocale;
  artworkBannerImage: string;
}

export interface ICategoryData extends ResponseData<IVideoDetail[]> {
  categoryInfo: ICategoryInfo;
}

export interface IChannelData extends ResponseData<IVideoDetail[]> {
  channelInfo: IChannelDetail;
}

export interface ICategory {
  value: string;
  title: ITitleLocale;
  artworkPlainImage: string;
}

export interface ITrendingVideoDetail extends IVideoDetail {
  totalPracticedUser: number;
  listPhotoUrls: string[];
}

export interface IGetTrendingVideosResponse
  extends ApiResponse2<ITrendingVideoDetail[]> {}

export interface IGetChannelVideoListResponse
  extends ApiResponse<IChannelVideoList[]> {}

export interface IGetCategoryListResponse extends ApiResponse2<ICategoryData> {}

export interface IGetChannelListResponse extends ApiResponse2<IChannelData> {}

export interface IGetCategoriesResponse extends ApiResponse2<ICategory[]> {}

export interface ITopChannelDetail extends IChannelDetail {
  totalPracticedUser: number;
  listPhotoUrls?: string[];
}

export interface IGetTopChannelResponse
  extends ApiResponse2<ITopChannelDetail[]> {}
