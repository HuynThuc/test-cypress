import { apiClient } from '@/shared/api';
import { handleFilterParams } from '@/shared/utils';

import {
  IGetAllHelenSpeakingRequest,
  IListHelenSpeakingResponse,
} from '@/modules/learners/types';
import { LEARNER_API_ROUTES } from '@/modules/learners/utils';

async function getAllHelenSpeaking(
  req: IGetAllHelenSpeakingRequest,
): Promise<IListHelenSpeakingResponse> {
  return apiClient.post(
    LEARNER_API_ROUTES.GET_ALL_HELEN_SPEAKING,
    handleFilterParams(req),
  );
}

export const videoService = {
  getAllHelenSpeaking,
};
