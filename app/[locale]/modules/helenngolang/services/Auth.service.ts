import { toast } from 'react-toastify';

import { apiClient } from '../../../shared/api';
import { MAIN_API_ROUTES } from '../utils';
import { ISSOLoginResponse, LoginResponse } from '../types';

async function ssoLogin(
  accessToken: string,
  deviceUUID: string,
): Promise<LoginResponse | null> {
  try {
    const res: ISSOLoginResponse = await apiClient.post(
      MAIN_API_ROUTES.SSO_LOGIN,
      {
        accessToken: accessToken,
        providerName: 'google-oauth2',

        deviceID: deviceUUID,
        os: 'web',
        osVersion: 'web',
      },
    );
    return res?.data as LoginResponse;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    return null;
  }
}

export const authServices = {
  ssoLogin,
};
