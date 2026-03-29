import { profileControllerGetPublicProfile } from '@/shared/api/generated/endpoints/profile/profile';
import type { Profile } from '../types/types';
import { mapProfile } from '@/pages-layer/profile/api/profile-mapper';

export const getProfile = async (id: string): Promise<Profile> => {
  const data = await profileControllerGetPublicProfile(Number(id));

  return mapProfile(data);
};
