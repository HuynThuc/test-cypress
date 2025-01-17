import { NextRequest, NextResponse } from 'next/server';

import { SUPPORTED_LOCALES } from '@/shared/constants';

import { LoginResponse } from '@/modules/helenngolang/types';

const verifyStorePaths = ['/video-player'];

export const activeStoreAuthMiddleware = async (
  req: NextRequest,
  session: LoginResponse | null,
) => {
  const verifyStoreRegex = new RegExp(
    `^(/(${SUPPORTED_LOCALES.join('|')})/?)?$|^(/(${SUPPORTED_LOCALES.join('|')}))?(${verifyStorePaths.join('|')})/?$`,
    'i',
  );
  const url = req.nextUrl.clone();

  if (session) {
    if (!session.authorization && verifyStoreRegex.test(url.pathname)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  } else {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return null;
};
