'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { postsControllerGetPosts } from '@/shared/api/generated/endpoints/posts/posts';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';

const FEED_PAGE_SIZE = 4;

export const useFeedPostsInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: postsKeys.feed(),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      postsControllerGetPosts({
        pageNumber: pageParam,
        pageSize: FEED_PAGE_SIZE,
        sortBy: 'createdAt',
        sortDirection: 'desc',
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.pagesCount) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });
};
