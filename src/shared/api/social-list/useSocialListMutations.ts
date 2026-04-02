'use client';

import {
  useMutation,
  useQueryClient,
  type QueryClient,
  type QueryKey,
} from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import {
  followUser,
  removeFollower as removeFollowerRequest,
  unfollowUser,
} from './socialListActions';
import type { SocialListResponse } from './model/types';
import type { SocialListUser } from './model/types';

type ToggleFollowPayload = {
  id: number;
  shouldFollow: boolean;
  listItem?: SocialListUser;
};

type Params = {
  followToggleQueryKey: readonly unknown[];
  removeFollowerQueryKey: readonly unknown[] | null;
  syncFollowingFollowersProfileId: string | null;
};

function dedupeFilters(
  filters: { queryKey: unknown[]; exact: boolean }[],
): { queryKey: unknown[]; exact: boolean }[] {
  const seen = new Set<string>();
  const out: { queryKey: unknown[]; exact: boolean }[] = [];
  for (const f of filters) {
    const sig = `${JSON.stringify(f.queryKey)}:${f.exact}`;
    if (seen.has(sig)) continue;
    seen.add(sig);
    out.push(f);
  }
  return out;
}

function collectSnapshots(
  queryClient: QueryClient,
  filters: { queryKey: unknown[]; exact: boolean }[],
) {
  const previous: [QueryKey, SocialListResponse | undefined][] = [];
  for (const f of dedupeFilters(filters)) {
    previous.push(...queryClient.getQueriesData<SocialListResponse>(f));
  }
  return previous;
}

export function useSocialListMutations({
  followToggleQueryKey,
  removeFollowerQueryKey,
  syncFollowingFollowersProfileId,
}: Params) {
  const queryClient = useQueryClient();
  const [pendingFollowIds, setPendingFollowIds] = useState(
    () => new Set<number>(),
  );
  const [pendingRemoveFollowerIds, setPendingRemoveFollowerIds] = useState(
    () => new Set<number>(),
  );

  const { mutate: mutateToggleFollow } = useMutation({
    mutationFn: ({ id, shouldFollow }: ToggleFollowPayload) =>
      shouldFollow ? followUser(id) : unfollowUser(id),
    onMutate: async ({ id, shouldFollow, listItem }: ToggleFollowPayload) => {
      const activeFilter = {
        queryKey: followToggleQueryKey as unknown[],
        exact: true,
      };

      const filters = [activeFilter];
      if (syncFollowingFollowersProfileId) {
        filters.push(
          {
            queryKey: [
              'social-list',
              'following',
              syncFollowingFollowersProfileId,
            ],
            exact: true,
          },
          {
            queryKey: [
              'social-list',
              'followers',
              syncFollowingFollowersProfileId,
            ],
            exact: true,
          },
        );
      }

      const previous = collectSnapshots(queryClient, filters);

      queryClient.setQueriesData<SocialListResponse>(activeFilter, (old) =>
        old
          ? {
              ...old,
              items: old.items.map((user) =>
                user.id === id ? { ...user, isFollowing: shouldFollow } : user,
              ),
            }
          : old,
      );

      if (syncFollowingFollowersProfileId) {
        const followingFilter = {
          queryKey: [
            'social-list',
            'following',
            syncFollowingFollowersProfileId,
          ] as const,
          exact: true,
        };
        const followersFilter = {
          queryKey: [
            'social-list',
            'followers',
            syncFollowingFollowersProfileId,
          ] as const,
          exact: true,
        };

        queryClient.setQueriesData<SocialListResponse>(
          followingFilter,
          (old) => {
            if (!old) return old;

            if (!shouldFollow) {
              const nextItems = old.items.filter((u) => u.id !== id);
              const removed = old.items.length - nextItems.length;
              return {
                ...old,
                items: nextItems,
                totalCount: Math.max(0, old.totalCount - removed),
              };
            }

            const idx = old.items.findIndex((u) => u.id === id);
            if (idx >= 0) {
              return {
                ...old,
                items: old.items.map((u) =>
                  u.id === id ? { ...u, isFollowing: true } : u,
                ),
              };
            }
            if (listItem) {
              return {
                ...old,
                items: [...old.items, { ...listItem, isFollowing: true }],
                totalCount: old.totalCount + 1,
              };
            }
            return old;
          },
        );

        queryClient.setQueriesData<SocialListResponse>(
          followersFilter,
          (old) =>
            old
              ? {
                  ...old,
                  items: old.items.map((user) =>
                    user.id === id
                      ? { ...user, isFollowing: shouldFollow }
                      : user,
                  ),
                }
              : old,
        );
      }

      setPendingFollowIds((prev) => new Set(prev).add(id));

      return { previous };
    },
    onError: (_error, _vars, context) => {
      if (!context) return;
      context.previous.forEach(([queryKey, previousData]) => {
        queryClient.setQueryData(queryKey, previousData);
      });
    },
    onSettled: (_data, _error, variables) => {
      setPendingFollowIds((prev) => {
        const next = new Set(prev);
        next.delete(variables.id);
        return next;
      });
    },
  });

  const { mutate: mutateRemoveFollower } = useMutation({
    mutationFn: removeFollowerRequest,
    onMutate: async (id: number) => {
      if (!removeFollowerQueryKey?.length) {
        setPendingRemoveFollowerIds((prev) => new Set(prev).add(id));
        return { previous: [] };
      }

      const filter = {
        queryKey: removeFollowerQueryKey as unknown[],
        exact: true,
      };
      const previous = queryClient.getQueriesData<SocialListResponse>(filter);

      queryClient.setQueriesData<SocialListResponse>(filter, (old) => {
        if (!old) return old;

        const nextItems = old.items.filter((user) => user.id !== id);
        const removedCount = old.items.length - nextItems.length;

        return {
          ...old,
          items: nextItems,
          totalCount: Math.max(0, old.totalCount - removedCount),
        };
      });
      setPendingRemoveFollowerIds((prev) => new Set(prev).add(id));

      return { previous };
    },
    onError: (_error, _id, context) => {
      if (!context) return;
      context.previous.forEach(
        ([queryKey, previousData]: [
          QueryKey,
          SocialListResponse | undefined,
        ]) => {
          queryClient.setQueryData(queryKey, previousData);
        },
      );
    },
    onSettled: (_data, _error, id) => {
      setPendingRemoveFollowerIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    },
  });

  const toggleFollow = useCallback(
    (id: number, isFollowing: boolean, listItem?: SocialListUser) => {
      if (pendingFollowIds.has(id)) return;
      mutateToggleFollow({
        id,
        shouldFollow: !isFollowing,
        listItem,
      });
    },
    [pendingFollowIds, mutateToggleFollow],
  );

  const removeFollower = useCallback(
    (id: number) => {
      if (pendingRemoveFollowerIds.has(id)) return;
      mutateRemoveFollower(id);
    },
    [pendingRemoveFollowerIds, mutateRemoveFollower],
  );

  return {
    toggleFollow,
    removeFollower,
    isFollowPending: (id: number) => pendingFollowIds.has(id),
    isRemovePending: (id: number) => pendingRemoveFollowerIds.has(id),
  };
}
