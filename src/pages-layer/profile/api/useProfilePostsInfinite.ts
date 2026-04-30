'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import type { PostViewDto } from '@/shared/api/generated/model';
import { postsControllerGetProfilePosts } from '@/shared/api/generated/endpoints/posts/posts';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import { useInfiniteScrollTrigger } from '@/shared/lib/hooks';

const POSTS_PER_PAGE = 12;

export const useProfilePostsInfinite = (userId: string) => {
  const query = useInfiniteQuery({
    queryKey: postsKeys.usersPosts(userId),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await postsControllerGetProfilePosts(userId, {
        pageNumber: pageParam,
        pageSize: POSTS_PER_PAGE,
        sortBy: 'createdAt',
        sortDirection: 'desc',
      });

      return {
        data: response.items,
        total: response.totalCount,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.reduce(
        (count, page) => count + page.data.length,
        0,
      );

      return loadedItems < lastPage.total ? allPages.length + 1 : undefined;
    },
  });
  const fetchNextPage = query.fetchNextPage;
  const hasNextPage = query.hasNextPage;
  const isFetchingNextPage = query.isFetchingNextPage;

  const posts: PostViewDto[] =
    query.data?.pages.flatMap((page) => page.data) ?? [];

  const observerRef = useInfiniteScrollTrigger({
    enabled: !!hasNextPage && !isFetchingNextPage,
    onIntersect: () => fetchNextPage(),
  });

  return {
    posts,
    observerRef,
    hasNextPage,
    isPending: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
  };
};
