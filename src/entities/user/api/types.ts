export type UpdateProfileDto = {
  username: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  city: string;
  about: string;
};

export type UserProfile = UpdateProfileDto & {
  id: number;
  avatar: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
};
