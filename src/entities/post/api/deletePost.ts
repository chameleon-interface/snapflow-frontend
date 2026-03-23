import { api } from '@/shared/api';
import type { DeletePostInput } from '../model/types';

export const deletePost = async ({
  postId,
}: DeletePostInput): Promise<void> => {
  await api.delete(`/posts/${postId}`);
};
