import 'server-only';

import { postsControllerGetPosts } from '@/shared/api/generated/endpoints/posts/posts';
import { mainPageKeys } from '@/shared/api/keys-factories/mainPageKeysFactory';
import { unstable_cache } from 'next/cache';
import { POSTS_QUERY_PARAMS } from '../../model/postQueryParams';

const HOME_POSTS_TAG = mainPageKeys.posts().join(':');

export const getPostsSSR = unstable_cache(
  async () => postsControllerGetPosts(POSTS_QUERY_PARAMS),
  [...mainPageKeys.posts()],
  {
    revalidate: 60,
    tags: [HOME_POSTS_TAG],
  },
);
