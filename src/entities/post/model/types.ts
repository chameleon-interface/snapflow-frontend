import type {
  PostMediaViewDto,
  PostStatus,
  PostsControllerGetProfilePostsParams,
  PostsPageViewDto,
  PostViewDto,
  UpdatePostInputDto,
} from '@/shared/api/generated/model';

export type PostMedia = PostMediaViewDto;

export type PostOwner = {
  ownerId: string;
  username: string;
  avatarUrl: string | null;
};

export type ProfilePost = Omit<
  PostViewDto,
  'description' | 'status' | 'owner'
> & {
  description: string;
  owner: PostOwner;
  status: PostStatus;
};

export type Post = ProfilePost;

export type PostsPage = Omit<PostsPageViewDto, 'items'> & {
  items: ProfilePost[];
};

export type GetProfilePostsInput = PostsControllerGetProfilePostsParams & {
  userId: string;
};

export type UpdatePostInput = UpdatePostInputDto & {
  postId: string;
  ownerId: string;
};

export type DeletePostInput = {
  postId: string;
  ownerId: string;
};
