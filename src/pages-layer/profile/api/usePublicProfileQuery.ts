import { useQuery } from '@tanstack/react-query';
import { profileControllerGetPublicProfile } from '@/shared/api/generated/endpoints/profile/profile';
import type { Profile } from '../model/types';

export const usePublicProfileQuery = (id: string) => {
  return useQuery({
    queryKey: ['public-profile', id],
    queryFn: async (): Promise<Profile> => {
      const data = await profileControllerGetPublicProfile(Number(id));

      return {
        id: Number(data.id),
        username: data.username ?? '',
        avatar:
          data.avatarUrl ??
          'https://placehold.co/204x204/000000/FFFFFF/png?text=Avatar',
        about: data.aboutMe ?? '',
        followersCount: data.userMetadata.followersCount ?? 0,
        followingCount: data.userMetadata.followingCount ?? 0,
        postsCount: data.userMetadata.publicationsCount ?? 0,
      };
    },
    enabled: Number.isFinite(Number(id)),
    staleTime: 5 * 60 * 1000,
  });
};
