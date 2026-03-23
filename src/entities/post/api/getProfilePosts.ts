import { api } from '@/shared/api';
import type { GetProfilePostsInput, PostsPage } from '../model/types';

export const getProfilePosts = async ({
  userId,
  pageNumber = 1,
  pageSize = 8,
}: GetProfilePostsInput): Promise<PostsPage> => {
  const response = await api.get<PostsPage>(`/posts/user/${userId}`, {
    params: {
      pageNumber,
      pageSize,
    },
  });

  return response.data;
};
