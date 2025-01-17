import {
  AuthorizationInfo,
  ISSOLoginResponse,
} from '@/modules/helenngolang/types';
import { LEARNER_API_ROUTES } from '@/modules/learners/utils';
import { ErrorKeys } from '@/modules/learners/constants';
import { validateErrorCode } from '@/modules/learners/utils/validateErrrorCode.utils';
import ErrorConstants from '@/modules/learners/constants/ErrorConstants';

async function refreshToken({
  authSession,
  deviceID,
}: {
  authSession: AuthorizationInfo;
  deviceID: string;
}): Promise<ISSOLoginResponse> {
  try {
    const response = await fetch(LEARNER_API_ROUTES.REFRESH_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authSession.accessToken}`,
      },
      body: JSON.stringify({
        refreshToken: authSession.refreshToken,
        deviceID,
        os: 'web',
        osVersion: 'web',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorCode: ErrorKeys = validateErrorCode(
        errorData.error || ErrorConstants.ErrSomethingWentWrong,
      );
      return {
        code: response.status,
        message: errorCode,
        data: null,
      };
    }

    const data = await response.json();
    return {
      code: response.status,
      message: 'Success',
      data: data.data,
    };
  } catch (error) {
    return {
      code: 500,
      message:
        error instanceof Error
          ? error.message
          : ErrorConstants.ErrClientNoInternet,
      data: null,
    };
  }
}

export const tokenService = {
  refreshToken,
};
