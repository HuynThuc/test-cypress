import { ApiResponse2, ITitleLocale } from '@/shared/types';

export interface IAudioTopics {
  topicId: number;
  name: ITitleLocale;
  slug: string;
  description: ITitleLocale;
  difficulty: string;
  imageUrl: string;
}
export interface IAudioTopicsRequest {
  channelId?: number;
  page?: number;
  limit?: number;
}
export interface IAudioTopicsResponse extends ApiResponse2<IAudioTopics[]> {}
