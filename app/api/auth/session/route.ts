import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import cookie from 'cookie';

import { calculateMaxAge } from '@/shared/services';

const errorMessages: { [key: string]: string } = {
  en: 'Invalid session data',
  vi: 'Dữ liệu session không hợp lệ',
  ja: 'セッションデータが無効です',
};

function getErrorMessage(locale: string) {
  return errorMessages[locale] || errorMessages['en'];
}

function getLocale(cookieStore: ReturnType<typeof cookies>) {
  const localeCookie = cookieStore.get('Next-Local');
  return localeCookie ? localeCookie.value : 'en';
}

export async function GET() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('SESSION_ID');
  const stringError = getLocale(cookieStore);
  if (sessionCookie) {
    try {
      const sessionData = JSON.parse(sessionCookie.value);
      return NextResponse.json(sessionData);
    } catch (error) {
      return NextResponse.json(
        { error: getErrorMessage(stringError) },
        { status: 400 },
      );
    }
  }

  return NextResponse.json(null);
}

export async function POST(request: Request) {
  const { session } = await request.json();
  const maxAge = calculateMaxAge(session.authorization.refreshTokenExpiresAt);
  const serializedCookie = cookie.serialize(
    'SESSION_ID',
    JSON.stringify(session),
    {
      httpOnly: true,
      secure: true,
      maxAge: maxAge,
      path: '/',
    },
  );

  const response = NextResponse.json({
    code: 200,
    message: 'Session updated successfully',
    res: session,
  });
  response.headers.append('Set-Cookie', serializedCookie);

  return response;
}
export async function DELETE() {
  const serializedCookie = cookie.serialize('SESSION_ID', '', {
    httpOnly: true,
    secure: true,
    maxAge: -1,
    path: '/',
  });

  const response = NextResponse.json({
    code: 200,
    message: 'Session updated successfully',
  });
  response.headers.append('Set-Cookie', serializedCookie);

  return response;
}
