import type {
  PostMediaViewDto,
  PostsControllerGetProfilePostsParams,
  PostsPageViewDto,
  PostViewDto,
  PostViewDtoStatus,
} from '@/shared/api/generated/model';

export type PostMedia = PostMediaViewDto;

export type PostOwner = {
  ownerId: number;
  username: string;
  avatarUrl: string | null;
};

export type ProfilePost = Omit<
  PostViewDto,
  'description' | 'status' | 'owner'
> & {
  description: string;
  owner: PostOwner;
  status: PostViewDtoStatus;
};

export type Post = ProfilePost;

export type PostsPage = Omit<PostsPageViewDto, 'items'> & {
  items: ProfilePost[];
};

export type GetProfilePostsInput = PostsControllerGetProfilePostsParams & {
  userId: number;
};

export type UpdatePostInput = {
  postId: number;
  description: string;
};

export type DeletePostInput = {
  postId: number;
};
