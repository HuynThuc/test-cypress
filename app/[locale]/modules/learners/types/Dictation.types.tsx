import {
  IResponseBody2,
  ITextDiffDataResponse,
} from '@/app/[locale]/shared/types';

export interface ITextCheck {
  type: number;
  text: string;
}

export interface IDictationCheckResponseBody
  extends IResponseBody2<ITextDiffDataResponse<ITextCheck>> {}
