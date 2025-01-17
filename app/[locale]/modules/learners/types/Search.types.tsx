import { IResponseBody3, ITitleLocale } from '@/app/[locale]/shared/types';

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
export interface ISearch {
  videos: IVideoDetail[];
  word: string;
}
export interface ISearchResponse extends IResponseBody3<ISearch> {
  videos: IVideoDetail[];
  words: string[];
}

export interface IDefinition {
  id: string;
  pronunciationUK: string;
  pronunciationUS: string;
  pronunciationKK: string;
  wordPlural: string;
  wordPast: string;
  wordDone: string;
  wordIng: string;
  wordThird: string;
  meaningId: number;
  pronunciationIPA: string;
  pos: string;
  posFullName: string;
  englishExample: string;
  englishDefinition: string;
  chineseTraditionalDefinition: string;
  chineseSimplifiedDefinition: string;
  japaneseDefinition: string;
  vietnameseDefinition: string;
  pronunciationUKMp3: string;
  pronunciationUSMp3: string;
  pronunciationTTSMp3: string;
  word: string;
}

export interface IWord {
  word: string;
  cefrLevel: string;
  termFrequency: number;
  definitions: IDefinition;
}

export interface IWordResponse extends IResponseBody3<IWord> {
  definitions: IDefinition[];
}
