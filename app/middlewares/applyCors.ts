import { NextRequest, NextResponse } from 'next/server';

export function applyCORS(request: NextRequest, response: NextResponse) {
  const allowedOrigins = [
    'https://www.rabitoenglish.com',
    'https://rabitoenglish.com',
  ];
  const origin = request.headers.get('origin');

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  } else {
    response.headers.set('Access-Control-Allow-Origin', '*'); // For development environment or fallback
  }

  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
  );
  response.headers.set('Access-Control-Max-Age', '86400');
}
