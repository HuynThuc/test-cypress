import { NextResponse } from 'next/server';
import cookie from 'cookie';

export async function POST() {
  const serializedCookie = cookie.serialize('SESSION_ID', '', {
    httpOnly: true,
    secure: true,
    maxAge: -1,
    path: '/',
  });

  const response = NextResponse.json({
    code: 200,
    message: 'Logged out successfully',
  });
  response.headers.append('Set-Cookie', serializedCookie);

  return response;
}
