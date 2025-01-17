import { ApiResponse2 } from '@/shared/types';

import { IVideoDetail } from '@/modules/learners/types/VideoLearner.types';

export interface IActivities {
  mediaUrl: string;
  progressAtSeconds: number;
  actionAt: string;
}
export interface IVideoActivity {
  video: IVideoDetail;
  progressAtSeconds: number;
  actionAt: string;
}
export interface IListVideoContinue {
  userId: string;
  list: IVideoActivity[];
}

export interface IGetVideoContinueResponse
  extends ApiResponse2<IListVideoContinue> {}
