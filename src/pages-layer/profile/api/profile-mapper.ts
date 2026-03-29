import type { PublicProfileViewDto } from '@/shared/api/generated/model/publicProfileViewDto';
import type { Profile } from '@/pages-layer/profile/types/types';

export const mapProfile = (data: PublicProfileViewDto): Profile => ({
  id: Number(data.id),
  username: data.username ?? '',
  avatar:
    data.avatarUrl ||
    'https://placehold.co/204x204/000000/FFFFFF/png?text=Avatar',
  about: data.aboutMe ?? 'Your profile description will be here',
  followersCount: data.userMetadata.followersCount ?? 0,
  followingCount: data.userMetadata.followingCount ?? 0,
  postsCount: data.userMetadata.publicationsCount ?? 0,
});
