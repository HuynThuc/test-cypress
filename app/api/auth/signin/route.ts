import { NextResponse } from 'next/server';
import cookie from 'cookie';

import { calculateMaxAge } from '@/shared/services';

import { AuthorizationInfo, UserInfo } from '@/modules/helenngolang/types';

export async function POST(request: Request) {
  const {
    user,
    authorization,
  }: { user: UserInfo; authorization: AuthorizationInfo } =
    await request.json();
  if (!user || !authorization) {
    return NextResponse.json(
      { error: 'User info and authorization are required' },
      { status: 400 },
    );
  }
  const maxAge = calculateMaxAge(authorization.refreshTokenExpiresAt);

  try {
    // Save user information and token into cookie
    const serializedCookie = cookie.serialize(
      'SESSION_ID',
      JSON.stringify({ user, authorization }),
      {
        httpOnly: true, // Cookie cannot be accessed via JavaScript
        secure: true, // Cookie requires HTTPS connection when SameSite is 'None'
        maxAge: maxAge,
        path: '/',
      },
    );

    // Return response and set cookie in header
    const response = NextResponse.json({
      code: 200,
      message: 'Cookie set successfully',
    });
    response.headers.set('Set-Cookie', serializedCookie);

    return response;
  } catch (error) {
    return NextResponse.json(
      { code: 500, message: 'Failed to set cookie' },
      { status: 500 },
    );
  }
}
