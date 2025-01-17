import { IListResponseBody2 } from '@/app/[locale]/shared/types';

export interface DefinitionWord {
  id: string;
  posFullName: string;
  englishExample: string;
  englishDefinition: string;
  vietnameseDefinition: string;
}

export interface VocabWord {
  id: string;
  word: string;
  cefrLevel: string;
  definitions: DefinitionWord[] | null;
}
export interface IListWordVocab extends IListResponseBody2<VocabWord> {}
