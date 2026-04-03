'use client';

import { getPosts } from '@/entities/post/api/getPosts';
import { LATEST_POSTS_QUERY_PARAMS } from '@/entities/post/model/latestPostsQueryParams';
import { mainPageKeys } from '@/shared/api/keys-factories/mainPageKeysFactory';
import { useQuery } from '@tanstack/react-query';

export const usePostsQuery = () => {
  return useQuery({
    queryKey: mainPageKeys.posts(),
    queryFn: () => getPosts(LATEST_POSTS_QUERY_PARAMS),
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    refetchIntervalInBackground: false,
    meta: { skipGlobalLoader: true },
  });
};
