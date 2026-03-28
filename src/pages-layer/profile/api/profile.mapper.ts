import type { ApiProfile, Profile } from '@/pages-layer/profile/types/types';

export const mapProfile = (data: ApiProfile): Profile => ({
  id: Number(data.id),
  username: data.username ?? '',
  avatar:
    data.avatarUrl ||
    'https://placehold.co/204x204/000000/FFFFFF/png?text=Avatar',
  about: data.aboutMe ?? 'Your profile description will be here',
  followersCount: data.followersCount ?? 0,
  followingCount: data.followingCount ?? 0,
  postsCount: data.postsCount ?? 0,
});
