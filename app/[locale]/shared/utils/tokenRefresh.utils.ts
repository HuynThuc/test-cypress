import { NextRequest, NextResponse } from 'next/server';

import { tokenService } from '@/shared/services/TokenRefresh.Service';
import { calculateMaxAge } from '@/shared/services';

import { AuthorizationInfo, LoginResponse } from '@/modules/helenngolang/types';

// Check if the token has expired
export const isTokenExpired = (expiresAt: string): boolean => {
  return Date.now() >= new Date(expiresAt).getTime();
};

// Refresh token with retry
export const refreshAccessTokenWithRetry = async (
  authSession: AuthorizationInfo,
  deviceID: string,
  retryCount: number = 2,
): Promise<LoginResponse> => {
  while (retryCount > 0) {
    try {
      return await refreshAccessToken(authSession, deviceID);
    } catch (error) {
      retryCount--;
      if (retryCount === 0) {
        throw new Error('Failed to refresh access token after retries');
      }
    }
  }
  throw new Error('Failed to refresh access token after retries');
};

// Main function to refresh token
export const refreshAccessToken = async (
  authSession: AuthorizationInfo,
  deviceID: string,
): Promise<LoginResponse> => {
  try {
    const { data: newTokenData } = await tokenService.refreshToken({
      authSession,
      deviceID,
    });
    if (!newTokenData?.authorization?.accessToken || !newTokenData.user) {
      throw new Error('Invalid token data received');
    }
    return newTokenData;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};
// Helper function to try refreshing the access token
export async function tryRefreshToken(
  session: LoginResponse,
  deviceID: string,
  response: NextResponse,
  request: NextRequest,
) {
  try {
    const res = await refreshAccessTokenWithRetry(
      session.authorization,
      deviceID,
    );
    if (res) {
      const maxAge = calculateMaxAge(res.authorization.refreshTokenExpiresAt);
      response.cookies.set(
        'SESSION_ID',
        JSON.stringify({
          user: session.user,
          authorization: res.authorization,
        }),
        {
          httpOnly: true,
          secure: true,
          maxAge: maxAge,
          path: '/',
        },
      );
    }
  } catch {
    response.cookies.delete('SESSION_ID');
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}
