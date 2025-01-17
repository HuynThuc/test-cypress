import { IListResponseBody } from '@/app/[locale]/shared/types';

export interface IGetAllLanguageRequest {
  locale?: string;
  name?: string;
  hdImage?: string;
  image?: string;
  flagImage?: string;
  video?: string;
}

export interface ILanguage {
  locale?: string;
  name?: string;
  hdImage?: string;
  image?: string;
  flagImage?: string;
  video?: string;
}

export interface IListLanguageResponse extends IListResponseBody<ILanguage> {}

export interface IGetLanguagePairRequest {
  locale?: string;
}

export interface ILanguagePair {
  languagePairId?: string;
  sourceLanguage?: string;
  sourceLanguageName?: string;
  targetLanguage?: string;
  targetLanguageName?: string;
  targetLanguageHdImage?: string;
  targetLanguageFlagImage?: string;
  targetLanguageVideo?: string;
}

export interface IListLanguagePairResponse
  extends IListResponseBody<ILanguagePair> {}
