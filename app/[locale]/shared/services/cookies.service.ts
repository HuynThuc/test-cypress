import { NextResponse } from 'next/server';

import { calculateMaxAge } from '@/shared/services/calculateMaxAge';

import {
  AuthorizationInfo,
  LoginResponse,
  UserInfo,
} from '@/modules/helenngolang/types';

export const cookiesService = {
  async getDeviceId(): Promise<string | null> {
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();
    const deviceIdCookie = cookieStore.get('DeviceUUID');

    if (deviceIdCookie) {
      return deviceIdCookie.value as string;
    }
    return null;
  },

  async getSession(): Promise<LoginResponse | null> {
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('SESSION_ID');

    if (sessionCookie) {
      try {
        return JSON.parse(sessionCookie.value);
      } catch {
        return null;
      }
    }
    return null;
  },

  async postSession({
    user,
    authorization,
  }: {
    user: UserInfo;
    authorization: AuthorizationInfo;
  }): Promise<NextResponse> {
    if (!user || !authorization) {
      return NextResponse.json(
        { error: 'User info and authorization are required' },
        { status: 400 },
      );
    }

    const maxAge = calculateMaxAge(authorization.refreshTokenExpiresAt);

    try {
      const response = NextResponse.json(
        {
          code: 200,
          message: 'Cookie set successfully',
        },
        { status: 200 },
      );

      response.cookies.set(
        'SESSION_ID',
        JSON.stringify({ user, authorization }),
        {
          httpOnly: true,
          secure: true,
          maxAge: maxAge,
          path: '/',
        },
      );

      return response;
    } catch (error) {
      return NextResponse.json(
        { code: 500, message: 'Failed to set cookie' },
        { status: 500 },
      );
    }
  },
};
