import { ApiResponse2, ITitleLocale } from '@/shared/types';

export interface IVideoCategory {
  value: string;
  title: ITitleLocale;
  artworkPlainImage: string;
}

export interface IGetVideoCategoriesResponse
  extends ApiResponse2<IVideoCategory[]> {}
