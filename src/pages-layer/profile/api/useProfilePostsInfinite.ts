'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import type { PostViewDto } from '@/shared/api/generated/model/core';
import type { UserPostsPageViewDtoNextCursor } from '@/shared/api/generated/model/core/userPostsPageViewDtoNextCursor';
import { postsControllerGetProfilePosts } from '@/shared/api/generated/endpoints/core/posts/posts';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import { useInfiniteScrollTrigger } from '@/shared/lib/hooks';

const POSTS_PER_PAGE = 12;

const serializeCursor = (
  cursor: UserPostsPageViewDtoNextCursor | string | undefined,
): string | undefined => {
  if (cursor == null) {
    return undefined;
  }

  if (typeof cursor === 'string') {
    return cursor;
  }

  return JSON.stringify(cursor);
};

export const useProfilePostsInfinite = (userId: string) => {
  const query = useInfiniteQuery({
    queryKey: postsKeys.usersPosts(userId),
    queryFn: async ({ pageParam }) => {
      return postsControllerGetProfilePosts(userId, {
        cursor: pageParam,
        limit: POSTS_PER_PAGE,
      });
    },
    enabled: userId.trim().length > 0,
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) {
        return undefined;
      }

      return serializeCursor(lastPage.nextCursor);
    },
  });
  const fetchNextPage = query.fetchNextPage;
  const hasNextPage = query.hasNextPage;
  const isFetchingNextPage = query.isFetchingNextPage;

  const posts: PostViewDto[] =
    query.data?.pages.flatMap((page) => page.items) ?? [];

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
