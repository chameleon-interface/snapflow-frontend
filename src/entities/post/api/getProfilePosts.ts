import { postsControllerGetProfilePosts } from '@/shared/api/generated/endpoints/posts/posts';
import type { GetProfilePostsInput, PostsPage } from '../model/types';
import { mapPostsPageDtoToPostsPage } from '../model/mappers';

export const getProfilePosts = async ({
  userId,
  pageNumber = 1,
  pageSize = 8,
  sortBy,
  sortDirection,
}: GetProfilePostsInput): Promise<PostsPage> => {
  const response = await postsControllerGetProfilePosts(userId, {
    pageNumber,
    pageSize,
    sortBy,
    sortDirection,
  });

  return mapPostsPageDtoToPostsPage(response);
};
