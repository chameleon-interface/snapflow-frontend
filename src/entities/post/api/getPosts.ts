import { postsControllerGetPosts } from '@/shared/api/generated/endpoints/posts/posts';
import type { PostsControllerGetPostsParams } from '@/shared/api/generated/model';

export const getPosts = (params: PostsControllerGetPostsParams) => {
  return postsControllerGetPosts(params);
};
