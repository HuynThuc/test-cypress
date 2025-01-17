import {
  RequestCookies,
  ResponseCookies,
} from 'next/dist/compiled/@edge-runtime/cookies';
import { NextRequest, NextResponse } from 'next/server';

import { calculateMaxAge } from '@/shared/services';

import { LoginResponse } from '@/modules/helenngolang/types';

function applySetCookie(req: NextRequest, res: NextResponse | Response): void {
  // parse the outgoing Set-Cookie header
  const setCookies = new ResponseCookies(res.headers);
  // Build a new Cookie header for the request by adding the setCookies
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));
  // set “request header overrides” on the outgoing response
  NextResponse.next({
    request: { headers: newReqHeaders },
  }).headers.forEach((value, key) => {
    if (
      key === 'x-middleware-override-headers' ||
      key.startsWith('x-middleware-request-')
    ) {
      res.headers.set(key, value);
    }
  });
}
// Helper function to apply cookie and return the appropriate response
export async function applyCookieAndReturnResponse(
  response: NextResponse | Response,
  middlewareResponse: NextResponse,
  session: LoginResponse | null,
  request: NextRequest,
) {
  if (session && response instanceof NextResponse) {
    const sessionCookieValue =
      middlewareResponse.cookies.get('SESSION_ID')?.value;
    const maxAge = calculateMaxAge(session.authorization.refreshTokenExpiresAt);
    if (sessionCookieValue && sessionCookieValue !== '') {
      response.cookies.set('SESSION_ID', sessionCookieValue, {
        httpOnly: true,
        secure: true,
        maxAge: maxAge,
        path: '/',
      });
    }
  }
  applySetCookie(request, response);
  return response;
}
