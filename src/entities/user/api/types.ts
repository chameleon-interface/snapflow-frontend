export type UpdateProfileDto = {
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  country: string | null;
  city: string | null;
  aboutMe: string | null;
};

export type UserProfile = UpdateProfileDto & {
  id: number;
  avatar: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
};
