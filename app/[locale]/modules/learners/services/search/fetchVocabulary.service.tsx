import { apiClient } from '@/shared/api';

import { LEARNER_APP_ROUTES } from '@/modules/learners/utils/api-app-routes';
import { IWordResponse } from '@/modules/learners/types/Search.types';

export const fetchVocabulary = async (
  vocabulary: string,
): Promise<IWordResponse | null> => {
  try {
    const response = await apiClient.get<{ data: IWordResponse }>(
      `${LEARNER_APP_ROUTES.VOCABULARY}/get-word?word=${vocabulary}`,
    );
    return response.data;
  } catch (error) {
    return null;
  }
};
