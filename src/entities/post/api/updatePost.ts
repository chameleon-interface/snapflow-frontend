import { postsControllerEditPost } from '@/shared/api/generated/endpoints/posts/posts';
import type { UpdatePostInput } from '../model/types';

export const updatePost = async ({
  postId,
  description,
}: UpdatePostInput): Promise<void> => {
  await postsControllerEditPost(postId, {
    description,
  });
};
