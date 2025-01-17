import { cookies } from 'next/headers';
import cookie from 'cookie';

// Function to retrieve the server session from cookies
export const getServerSession = () => {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get('SESSION_ID');

  if (sessionCookie) {
    try {
      return JSON.parse(sessionCookie.value);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to parse session cookie:', error);
    }
  }

  // If session cookie does not exist or is invalid, return null
  return null;
};
export const deleteSession = () => {
  const serializedCookie = cookie.serialize('SESSION_ID', '', {
    httpOnly: true,
    secure: true,
    maxAge: -1,
    path: '/',
  });
  return serializedCookie;
};

export const sessionService = {
  getServerSession,
  deleteSession,
};
