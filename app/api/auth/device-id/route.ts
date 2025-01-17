import { NextResponse } from 'next/server';
import cookie from 'cookie';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('DeviceUUID');
  if (sessionCookie) {
    try {
      const sessionData = sessionCookie;
      return NextResponse.json({ deviceId: sessionData.value });
    } catch (error) {
      return NextResponse.json(
        { error: 'Error get DeviceUUID' },
        { status: 400 },
      );
    }
  }

  return NextResponse.json(null);
}
export async function POST(request: Request) {
  const { deviceId } = await request.json();

  const serializedCookie = cookie.serialize('DeviceUUID', deviceId, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 60 * 60 * 24 * 365 * 100, // 100 years
    path: '/',
  });

  const response = NextResponse.json({
    error: 'DeviceUUID updated successfully',
    res: deviceId,
  });
  response.headers.append('Set-Cookie', serializedCookie);

  return response;
}
export async function DELETE() {
  const serializedCookie = cookie.serialize('DeviceUUID', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: -1,
    path: '/',
  });

  const response = NextResponse.json({
    error: 'DeviceUUID deleted successfully',
  });
  response.headers.append('Set-Cookie', serializedCookie);

  return response;
}
