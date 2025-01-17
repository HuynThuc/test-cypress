import { apiService } from '@/shared/services/httpClient.service';

import { IResponseLanguages } from '@/modules/learners/types';
import { LEARNER_API_ROUTES } from '@/modules/learners/utils';

const getSupportLanguages = async (): Promise<IResponseLanguages> => {
  const response = await apiService.get<IResponseLanguages>(
    LEARNER_API_ROUTES.GET_ALL_SUPPORT_LANGUAGES,
  );

  return (
    response.data ?? {
      code: response.code,
      data: null,
      error: response.error,
      success: false,
    }
  );
};

export const languageService = {
  getSupportLanguages,
};
