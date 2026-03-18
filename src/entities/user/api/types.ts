export type UpdateProfileDto = {
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  dateOfBirth: string | null;
  country: string | null;
  city: string | null;
  aboutMe: string | null;
};

export type UploadProfileAvatarDto = {
  avatar: File;
};

export type UploadProfileAvatarResponse = {
  publicUrl: string;
};

export type UserProfile = UpdateProfileDto & {
  id: number;
  avatar: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
};
