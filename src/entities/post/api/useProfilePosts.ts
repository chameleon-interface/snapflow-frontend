'use client';

import { useQuery } from '@tanstack/react-query';
import { postQueryKeys } from '@/entities/post/model/queryKeys';
import type { GetProfilePostsInput } from '../model/types';
import { getProfilePosts } from '@/entities/post/api/getProfilePosts';

export const useProfilePosts = ({
  userId,
  pageNumber = 1,
  pageSize = 8,
}: GetProfilePostsInput) => {
  return useQuery({
    queryKey: [...postQueryKeys.byProfile(userId), pageNumber, pageSize],
    queryFn: () => getProfilePosts({ userId, pageNumber, pageSize }),
    enabled: Number.isFinite(userId) && userId > 0,
  });
};
