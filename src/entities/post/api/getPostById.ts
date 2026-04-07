import { postsControllerGetPostById } from '@/shared/api/generated/endpoints/posts/posts';
import type { ProfilePost } from '../model/types';
import { mapPostDtoToPost } from '../model/mappers';

export const getPostById = async (postId: string): Promise<ProfilePost> => {
  const response = await postsControllerGetPostById(postId);

  return mapPostDtoToPost(response);
};
