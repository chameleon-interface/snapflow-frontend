import { api } from '@/shared/api';
import type { UpdatePostInput } from '../model/types';

export const updatePost = async ({
  postId,
  description,
}: UpdatePostInput): Promise<void> => {
  await api.patch(`/posts/${postId}`, {
    description,
  });
};
