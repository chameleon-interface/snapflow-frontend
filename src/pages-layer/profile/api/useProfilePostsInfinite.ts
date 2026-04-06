'use client';

import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { postsControllerGetProfilePosts } from '@/shared/api/generated/endpoints/posts/posts';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import type { Post } from '../model/types';

const POSTS_PER_PAGE = 12;

export const useProfilePostsInfinite = (profileId: string) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const query = useInfiniteQuery({
    queryKey: postsKeys.usersPosts(profileId),
    queryFn: async ({ pageParam = 1 }) => {
      const response = await postsControllerGetProfilePosts(profileId, {
        pageNumber: pageParam,
        pageSize: POSTS_PER_PAGE,
        sortBy: 'createdAt',
        sortDirection: 'desc',
      });

      return {
        data: response.items.map((item) => ({
          id: item.id,
          profileId: item.owner.ownerId,
          mediaCount: item.postMedias?.length ?? 0,
          medias:
            item.postMedias?.map((media) => ({
              id: media.postMediaId,
              url: media.url,
            })) ?? [],
        })),
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

  const posts: Post[] = query.data?.pages.flatMap((page) => page.data) ?? [];

  useEffect(() => {
    const node = observerRef.current;

    if (!node || !hasNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return {
    posts,
    observerRef,
    hasNextPage,
    isPending: query.isPending,
    isError: query.isError,
    refetch: query.refetch,
  };
};
