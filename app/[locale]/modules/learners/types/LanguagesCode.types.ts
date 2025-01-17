import { ApiResponse2 } from '@/shared/types';

export interface ILanguageCountry {
  name: string;
  code: string;
}

export interface IResponseLanguages extends ApiResponse2<ILanguageCountry[]> {}
