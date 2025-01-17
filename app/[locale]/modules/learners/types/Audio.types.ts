import { IListResponseBody, IResponseBody3 } from '@/app/[locale]/shared/types';

export interface IGetListAudioRequest {
  channelId: number;
  page: number;
  limit: number;
}
export interface IAudio {
  id: string;
  audioId: string;
  slug: string;
  name: string;
  audioSrc: string;
}
export interface IListAudioResponse extends IListResponseBody<IAudio> {}

// Detail player audio
export interface ISubtitleAudio {
  position: number;
  content: string;
  solution: string[];
  audioSrc: string;
  timStart: number;
  timeEnd: number;
  hint: string;
}

export interface IAudioDetail {
  id: string;
  audioId: string;
  name: string;
  slug: string;
  audioSrc: string;
  challenges: ISubtitleAudio[];
}
export interface IGetAudioDetailResponse extends IResponseBody3<IAudioDetail> {}
