import type { PostsControllerGetPostsParams } from '@/shared/api/generated/model';

export const LATEST_POSTS_QUERY_PARAMS: PostsControllerGetPostsParams = {
  pageNumber: 1,
  pageSize: 4,
  sortBy: 'createdAt',
  sortDirection: 'desc',
};
