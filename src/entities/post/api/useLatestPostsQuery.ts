'use client';

import { useQuery } from '@tanstack/react-query';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import { postsControllerGetPosts } from '@/shared/api/generated/endpoints/posts/posts';
import { LATEST_POSTS_QUERY_PARAMS } from '../model/latestPostsQueryParams';

export const useLatestPostsQuery = () => {
  return useQuery({
    queryKey: postsKeys.latest(),
    queryFn: () => postsControllerGetPosts(LATEST_POSTS_QUERY_PARAMS),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    refetchIntervalInBackground: false,
    meta: { skipGlobalLoader: true },
  });
};
