import { ApiResponse } from '@/shared/types';

// import { ContentListResponse } from '@/shared/types';
export interface IPopularAudios {
  audioId?: number;
  audioSrc: string;
  name: {
    [locale: string]: string;
  };
  slug: string;
  description: string;
  level: string;
  duration: number;
  totalViewed: number;
  isCharacterAudio: boolean;
  isNumbersAudio: boolean;
  imageUrl: string;
  durationText: string;
}
export interface IPopularAudiosRequest {
  page?: number;
  limit?: number;
  channelId?: number;
}
export interface IPopularAudiosResponse extends ApiResponse<IPopularAudios[]> {}
