import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileControllerUpdateProfile } from '@/shared/api/generated/endpoints/profile/profile';
import type {
  ProfileViewDto,
  PublicProfileViewDto,
  UpdateProfileInputDto,
} from '@/shared/api/generated/model';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateProfileInputDto) =>
      profileControllerUpdateProfile(body),
    onSuccess: (_data, variables) => {
      queryClient.setQueryData<ProfileViewDto | undefined>(
        profileKeys.myProfile(),
        (currentProfile) =>
          currentProfile
            ? {
                ...currentProfile,
                username: variables.username,
                firstName: variables.firstName,
                lastName: variables.lastName,
                dateOfBirth: variables.dateOfBirth ?? null,
                country: variables.country ?? null,
                city: variables.city ?? null,
                aboutMe: variables.aboutMe ?? null,
              }
            : currentProfile,
      );

      const profile = queryClient.getQueryData<ProfileViewDto>(
        profileKeys.myProfile(),
      );

      if (profile?.id) {
        queryClient.setQueryData<PublicProfileViewDto | undefined>(
          profileKeys.userProfile(profile.id),
          (currentProfile) =>
            currentProfile
              ? {
                  ...currentProfile,
                  username: variables.username,
                  aboutMe: variables.aboutMe ?? null,
                }
              : currentProfile,
        );
      }

      queryClient.invalidateQueries({ queryKey: profileKeys.myProfile() });
    },
  });
};
