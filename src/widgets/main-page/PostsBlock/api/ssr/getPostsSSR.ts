import 'server-only';

import { getPosts } from '@/entities/post/api/getPosts';
import { LATEST_POSTS_QUERY_PARAMS } from '@/entities/post/model/latestPostsQueryParams';
import { mainPageKeys } from '@/shared/api/keys-factories/mainPageKeysFactory';
import { unstable_cache } from 'next/cache';

const HOME_POSTS_TAG = mainPageKeys.posts().join(':');

export const getPostsSSR = unstable_cache(
  async () => getPosts(LATEST_POSTS_QUERY_PARAMS),
  [...mainPageKeys.posts()],
  {
    revalidate: 60,
    tags: [HOME_POSTS_TAG],
  },
);
