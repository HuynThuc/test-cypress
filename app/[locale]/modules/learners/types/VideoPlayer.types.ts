/* eslint-disable no-unused-vars */
import { IResponseBody2, IResponseBody3 } from '@/app/[locale]/shared/types';

import { IGetAllListVideo } from './ListVideo.types';

export enum VideoTab {
  Subtitles = 'subtitles',
  Dictation = 'dictation',
}

export interface Sub {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
}

export interface ConvertedSub {
  id: string;
  startTime: number;
  endTime: number;
  text: string[];
}

export interface VideoDetailAndSub {
  mediaInfo: IGetAllListVideo;
  subtitles: Sub[];
}
export interface IListVideoPlayerResponse
  extends IResponseBody3<VideoDetailAndSub> {}

export interface IWordDefinition {
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

export interface IWordInfo {
  id: number;
  word: string;
  cefrLevel: string;
  termFrequency: number;
  definitions: IWordDefinition[];
}

export interface IGetWordDefinitionResponseBody
  extends IResponseBody2<IWordInfo> {}

export interface IDefinitionGroup {
  pos: string;
  pronunciationUK: string;
  pronunciationUS: string;
  pronunciationKK: string;
  posFullName: string;
  englishDefinition?: string[];
}
export interface IGroupIDefinition {
  cefrLevel: string | undefined;
  definitions?: IDefinitionGroup[];
}
