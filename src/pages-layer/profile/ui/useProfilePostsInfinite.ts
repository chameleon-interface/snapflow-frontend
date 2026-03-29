'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import type { Post } from '../types/types';
import { getPosts } from '../api/posts';

const POSTS_PER_PAGE = 8;

export const useProfilePostsInfinite = (profileId: number) => {
  const query = useInfiniteQuery({
    queryKey: ['profile-posts', profileId, POSTS_PER_PAGE],
    queryFn: ({ pageParam = 1 }) =>
      getPosts(pageParam, POSTS_PER_PAGE, profileId),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.reduce(
        (count, page) => count + page.data.length,
        0,
      );

      return loadedItems < lastPage.total ? allPages.length + 1 : undefined;
    },
  });

  const posts: Post[] = query.data?.pages.flatMap((page) => page.data) ?? [];

  return {
    posts,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isPending: query.isPending,
  };
};
