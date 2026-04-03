import { jwtVerify } from 'jose';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { mainPageKeys } from '@/shared/api/keys-factories/mainPageKeysFactory';

const HOME_POSTS_TAG = mainPageKeys.posts().join(':');
const REQUIRED_ACTION = 'revalidate_home';
const encoder = new TextEncoder();

export const POST = async (request: Request) => {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      console.error('[revalidate-posts]: Invalid authorization header');
      return NextResponse.json(
        { message: 'Invalid Authorization header. Expected: Bearer <token>' },
        { status: 401 },
      );
    }

    const token = authHeader.slice('Bearer '.length).trim();
    if (!token) {
      console.error('[revalidate-posts]: Empty bearer token');
      return NextResponse.json(
        { message: 'Bearer token is empty' },
        { status: 401 },
      );
    }

    const secret = process.env.REVALIDATE_POSTS_JWT_SECRET;

    if (!secret) {
      console.error('[revalidate-posts]: Missing REVALIDATE_POSTS_JWT_SECRET');
      return NextResponse.json(
        { message: 'Missing server env: REVALIDATE_POSTS_JWT_SECRET' },
        { status: 500 },
      );
    }

    const { payload } = await jwtVerify(token, encoder.encode(secret), {
      algorithms: ['HS256'],
    });

    if (payload.action !== REQUIRED_ACTION) {
      console.error('[revalidate-posts]: Forbidden action claim', {
        action: payload.action,
      });
      return NextResponse.json(
        { message: 'Forbidden action. Expected: revalidate_home' },
        { status: 403 },
      );
    }

    revalidateTag(HOME_POSTS_TAG, 'max');

    return NextResponse.json({ revalidated: true }, { status: 200 });
  } catch (error) {
    console.error('[revalidate-posts]: JWT verification failed', { error });
    return NextResponse.json(
      { message: 'Invalid token. Please check your bearer token' },
      { status: 401 },
    );
  }
};
