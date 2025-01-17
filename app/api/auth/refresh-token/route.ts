import { NextResponse } from 'next/server';

import { refreshAccessTokenWithRetry } from '@/shared/utils';
import { cookiesService } from '@/shared/services/cookies.service';

import { LoginResponse } from '@/modules/helenngolang/types';

export async function POST() {
  const session: LoginResponse | null = await cookiesService.getSession();
  const deviceID = await cookiesService.getDeviceId();

  if (!session || !session.user || !session.authorization || !deviceID) {
    return NextResponse.json(
      { error: 'User info and authorization are required' },
      { status: 400 },
    );
  }

  try {
    const res = await refreshAccessTokenWithRetry(
      session.authorization,
      deviceID,
    );

    if (res instanceof Response || res instanceof NextResponse) {
      return res;
    }

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to refresh access token' },
      { status: 500 },
    );
  }
}
