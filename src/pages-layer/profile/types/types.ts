export type Profile = {
  id: number;
  username: string;
  avatar: string;
  about: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
};

export type Post = {
  id: number;
  profileId: number;
  photo: string;
};
