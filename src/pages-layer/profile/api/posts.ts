import { postsControllerGetProfilePosts } from '@/shared/api/generated/endpoints/posts/posts';
import { mapPost } from './posts-mapper';
import type { Post } from '../types/types';

export const getPosts = async (
  page: number,
  limit: number,
  profileId: number,
): Promise<{ data: Post[]; total: number }> => {
  const response = await postsControllerGetProfilePosts(profileId, {
    pageNumber: page,
    pageSize: limit,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  });

  return {
    data: response.items.map(mapPost),
    total: response.totalCount,
  };
};
