import { NextResponse } from 'next/server';

export const json = <T>(body: T, status = 200) =>
  NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control':
        status >= 200 && status < 300 ? 'public, max-age=86400' : 'no-store',
    },
  });
