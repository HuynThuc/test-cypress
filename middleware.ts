import { NextRequest, NextResponse } from 'next/server';

import { SUPPORTED_LOCALES } from '@/shared/constants';
import { cookiesService } from '@/shared/services/cookies.service';
import { isTokenExpired, tryRefreshToken } from '@/shared/utils';

import { applyCookieAndReturnResponse } from '@/app/middlewares/applySetCookie';
import { applyCORS } from '@/app/middlewares/applyCors';
import { activeStoreAuthMiddleware } from '@/app/middlewares/auth';
import { intlMiddleware } from '@/app/middlewares/intl';
import {
  handleLocale,
  redirectToPreferredLocale,
} from '@/app/middlewares/locale';

import { sessionService } from '@/modules/learners/services/auth/SessionSever.service';
import { LoginResponse } from '@/modules/helenngolang/types';

// Paths that are publicly accessible
const publicPages = [
  '/',
  '/not-found',
  '/signin',
  '/game',
  '/videos',
  '/videos/c/[^/]+',
  '/videos/channel/[^/]+',
  '/learn',
  '/pricing',
  '/search',
  '/faq',
  '/consultant',
];

export default async function middleware(request: NextRequest) {
  const publicPageRegex = new RegExp(
    `^(/(${SUPPORTED_LOCALES.join('|')})/?)?$|^(/(${SUPPORTED_LOCALES.join('|')}))?(${publicPages.join('|')})/?$`,
    'i',
  );
  const isPublicPage = publicPageRegex.test(request.nextUrl.pathname);
  let session: LoginResponse | null = sessionService.getServerSession();
  const deviceID = await cookiesService.getDeviceId();
  // eslint-disable-next-line prefer-const
  let middlewareResponse = NextResponse.next();

  // Handle locale
  const localeResponse = handleLocale(request);
  localeResponse && applyCORS(request, localeResponse);
  if (localeResponse) return localeResponse;

  const pathnameWithoutLocale = request.nextUrl.pathname.replace(
    new RegExp(`^/(${SUPPORTED_LOCALES.join('|')})(/|$)`),
    '/',
  );
  // Attempt to refresh access token if needed
  if (
    session &&
    deviceID &&
    isTokenExpired(session.authorization.accessTokenExpiresAt)
  ) {
    if (!isTokenExpired(session.authorization.refreshTokenExpiresAt)) {
      middlewareResponse = NextResponse.redirect(request.url);
      await tryRefreshToken(session, deviceID, middlewareResponse, request);
    } else {
      sessionService.deleteSession();
      session = null;
    }
  }

  // Redirect authenticated users away from the signin page
  if (session && isPublicPage && pathnameWithoutLocale === '/signin') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  // If the page is public, apply intlMiddleware and set cookie if session exists
  if (isPublicPage) {
    const intlResponse = intlMiddleware(request);
    applyCORS(request, intlResponse);
    return await applyCookieAndReturnResponse(
      intlResponse,
      middlewareResponse,
      session,
      request,
    );
  }

  // Check active store authentication for non-public pages
  const activeStoreCheck = await activeStoreAuthMiddleware(request, session);
  activeStoreCheck && applyCORS(request, activeStoreCheck);
  if (activeStoreCheck) return activeStoreCheck;

  // Redirect to preferred locale if necessary
  const preferredLocaleResponse = redirectToPreferredLocale(request);
  preferredLocaleResponse && applyCORS(request, preferredLocaleResponse);
  if (preferredLocaleResponse) return preferredLocaleResponse;

  // Apply intl middleware for remaining requests
  const intlResponse = intlMiddleware(request);
  // intlResponse = NextResponse.redirect(new URL('/', request.url));
  applyCORS(request, intlResponse);
  return await applyCookieAndReturnResponse(
    intlResponse,
    middlewareResponse,
    session,
    request,
  );
}

// Configuration for the middleware matcher
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
