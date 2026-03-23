import { api } from '@/shared/api';
import type { ProfilePost } from '../model/types';

export const getPostById = async (postId: number): Promise<ProfilePost> => {
  const response = await api.get<ProfilePost>(`/posts/${postId}`);

  return response.data;
};
