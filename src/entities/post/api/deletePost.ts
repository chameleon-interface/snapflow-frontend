import { postsControllerDeletePost } from '@/shared/api/generated/endpoints/posts/posts';
import type { DeletePostInput } from '../model/types';

export const deletePost = async ({
  postId,
}: DeletePostInput): Promise<void> => {
  await postsControllerDeletePost(postId);
};
