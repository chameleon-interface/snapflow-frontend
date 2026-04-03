import 'server-only';

import { getPosts } from '@/entities/post/api/getPosts';
import { LATEST_POSTS_QUERY_PARAMS } from '@/entities/post/model/latestPostsQueryParams';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import { unstable_cache } from 'next/cache';

const LATEST_POSTS_TAG = postsKeys.latest().join(':');

export const getPostsSSR = unstable_cache(
  async () => getPosts(LATEST_POSTS_QUERY_PARAMS),
  [...postsKeys.latest()],
  {
    revalidate: 60,
    tags: [LATEST_POSTS_TAG],
  },
);
