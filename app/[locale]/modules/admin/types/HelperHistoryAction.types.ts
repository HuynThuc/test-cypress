import { IListResponseBody } from '../../../shared/types';

export interface IHelperHistoryAction {
  targetAudience: string;
  category: string;
  imageUrl: string;
  title: string;
  scriptUrl: string;
  mp3Url: string;
  refUrl: string;
  status: string;

  id?: string;
}

export interface IListHelperHistoryActionResponse
  extends IListResponseBody<IHelperHistoryAction> {}
