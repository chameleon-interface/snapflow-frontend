export type Profile = {
  id: number;
  username: string;
  avatar: string;
  about: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
};

export type ApiProfile = {
  id: number;
  username: string;
  avatarUrl: string;
  aboutMe: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
};

export type Post = {
  id: number;
  profileId: number;
  photo: string;
  description: string;
};

export type ApiPost = {
  id: number;
  description: string;
  createdAt: string;
  postMedias: {
    url: string;
  }[];
  owner: {
    ownerId: number;
    username: string;
    avatarUrl: string;
  };
};

export type PostsResponse = {
  items: ApiPost[];
  totalCount: number;
  page: number;
  pageSize: number;
  pagesCount: number;
};
