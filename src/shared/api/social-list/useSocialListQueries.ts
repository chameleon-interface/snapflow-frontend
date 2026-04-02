'use client';

import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import {
  getPostLikes,
  getProfileFollowers,
  getProfileFollowing,
} from './socialListApi';
import type { SocialListResponse } from './model/types';

const SOCIAL_LIST_STALE_MS = 30_000;

type ListVariant = 'likes' | 'following' | 'followers';
type ListTab = 'following' | 'followers';
type Q = UseQueryResult<SocialListResponse, Error>;

type ActiveSocialList = {
  query: Q;
  queryKey: readonly unknown[];
};

function resolveActiveSocialList(
  variant: ListVariant,
  showProfileTabs: boolean,
  listTab: ListTab,
  postId: string,
  profileId: string,
  likesQuery: Q,
  followingQuery: Q,
  followersQuery: Q,
): ActiveSocialList {
  if (variant === 'likes') {
    return {
      query: likesQuery,
      queryKey: ['social-list', 'likes', postId],
    };
  }

  if (showProfileTabs) {
    return listTab === 'following'
      ? {
          query: followingQuery,
          queryKey: ['social-list', 'following', profileId],
        }
      : {
          query: followersQuery,
          queryKey: ['social-list', 'followers', profileId],
        };
  }

  return variant === 'following'
    ? {
        query: followingQuery,
        queryKey: ['social-list', 'following', profileId],
      }
    : {
        query: followersQuery,
        queryKey: ['social-list', 'followers', profileId],
      };
}

export type UseSocialListQueriesParams = {
  open: boolean;
  variant: ListVariant;
  postId: string;
  profileId: string;
  showProfileTabs: boolean;
  listTab: ListTab;
};

export function useSocialListQueries({
  open,
  variant,
  postId,
  profileId,
  showProfileTabs,
  listTab,
}: UseSocialListQueriesParams) {
  const needsFollowing =
    variant !== 'likes' && (showProfileTabs || variant === 'following');
  const needsFollowers =
    variant !== 'likes' && (showProfileTabs || variant === 'followers');

  const likesQuery = useQuery({
    queryKey: ['social-list', 'likes', postId] as const,
    queryFn: () => getPostLikes(postId),
    enabled: open && variant === 'likes',
    staleTime: SOCIAL_LIST_STALE_MS,
  });

  const followingQuery = useQuery({
    queryKey: ['social-list', 'following', profileId] as const,
    queryFn: () => getProfileFollowing(profileId),
    enabled: open && Boolean(profileId) && needsFollowing,
    staleTime: SOCIAL_LIST_STALE_MS,
  });

  const followersQuery = useQuery({
    queryKey: ['social-list', 'followers', profileId] as const,
    queryFn: () => getProfileFollowers(profileId),
    enabled: open && Boolean(profileId) && needsFollowers,
    staleTime: SOCIAL_LIST_STALE_MS,
  });

  const { query: activeQuery, queryKey: activeQueryKey } =
    resolveActiveSocialList(
      variant,
      showProfileTabs,
      listTab,
      postId,
      profileId,
      likesQuery,
      followingQuery,
      followersQuery,
    );

  return {
    likesQuery,
    followingQuery,
    followersQuery,
    activeQueryKey,
    data: activeQuery.data,
    isLoading: activeQuery.isLoading,
    isError: activeQuery.isError,
    refetchActive: () => void activeQuery.refetch(),
  };
}
