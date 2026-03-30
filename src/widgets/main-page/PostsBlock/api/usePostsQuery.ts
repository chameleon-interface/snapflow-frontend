'use client';

import { postsControllerGetPosts } from '@/shared/api/generated/endpoints/posts/posts';
import { mainPageKeys } from '@/shared/api/keys-factories/mainPageKeysFactory';
import { useQuery } from '@tanstack/react-query';
import { POSTS_QUERY_PARAMS } from '../model/postQueryParams';

export const usePostsQuery = () => {
  return useQuery({
    queryKey: mainPageKeys.posts(),
    queryFn: () => postsControllerGetPosts(POSTS_QUERY_PARAMS),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    refetchIntervalInBackground: false,
    meta: { skipGlobalLoader: true },
  });
};
