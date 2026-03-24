import type {
  PostViewDto,
  PostsPageViewDto,
} from '@/shared/api/generated/model';
import type { PostOwner, PostsPage, ProfilePost } from './types';

const mapPostDescription = (
  description: PostViewDto['description'],
): string => {
  return typeof description === 'string' ? description : '';
};

const mapPostOwner = (owner: PostViewDto['owner']): PostOwner => {
  return {
    ...owner,
    avatarUrl: typeof owner.avatarUrl === 'string' ? owner.avatarUrl : null,
  };
};

export const mapPostDtoToPost = (post: PostViewDto): ProfilePost => {
  return {
    ...post,
    description: mapPostDescription(post.description),
    owner: mapPostOwner(post.owner),
  };
};

export const mapPostsPageDtoToPostsPage = (
  postsPage: PostsPageViewDto,
): PostsPage => {
  return {
    ...postsPage,
    items: postsPage.items.map(mapPostDtoToPost),
  };
};
