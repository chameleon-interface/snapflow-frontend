'use client';

import { postsControllerCreatePost } from '@/shared/api/generated/endpoints/posts/posts';
import type {
  CreatePostInputDto,
  PublicProfileViewDto,
} from '@/shared/api/generated/model';
import { mainPageKeys } from '@/shared/api/keys-factories/mainPageKeysFactory';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostInputDto) =>
      postsControllerCreatePost(payload),
    onSuccess: (createdPost) => {
      queryClient.invalidateQueries({ queryKey: postsKeys.myPosts() });
      queryClient.invalidateQueries({
        queryKey: postsKeys.usersPosts(createdPost.owner.ownerId),
      });
      queryClient.invalidateQueries({ queryKey: mainPageKeys.posts() });
      queryClient.setQueryData<PublicProfileViewDto | undefined>(
        profileKeys.userProfile(createdPost.owner.ownerId),
        (currentProfile) =>
          currentProfile
            ? {
                ...currentProfile,
                userMetadata: {
                  ...currentProfile.userMetadata,
                  publicationsCount:
                    (currentProfile.userMetadata.publicationsCount ?? 0) + 1,
                },
              }
            : currentProfile,
      );
    },
  });
};
