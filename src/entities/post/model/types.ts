export type PostMedia = {
  postMediaId: number;
  fileId: string;
  url: string;
};

export type PostOwner = {
  ownerId: number;
  username: string;
  avatarUrl: string | null;
};

export type ProfilePost = {
  id: number;
  description: string;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  postMedias: PostMedia[];
  owner: PostOwner;
};

export type Post = ProfilePost;

export type PostsPage = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: ProfilePost[];
};

export type GetProfilePostsInput = {
  userId: number;
  pageNumber?: number;
  pageSize?: number;
};

export type UpdatePostInput = {
  postId: number;
  description: string;
};

export type DeletePostInput = {
  postId: number;
};
