import 'server-only';

import { LATEST_POSTS_QUERY_PARAMS } from '@/entities/post/model/latestPostsQueryParams';
import { postsControllerGetPosts } from '@/shared/api/generated/endpoints/posts/posts';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import { unstable_cache } from 'next/cache';

const LATEST_POSTS_TAG = postsKeys.latest().join(':');

export const getPostsSSR = unstable_cache(
  async () => postsControllerGetPosts(LATEST_POSTS_QUERY_PARAMS),
  [...postsKeys.latest()],
  {
    revalidate: 60,
    tags: [LATEST_POSTS_TAG],
  },
);
