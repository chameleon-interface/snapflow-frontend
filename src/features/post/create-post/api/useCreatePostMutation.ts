'use client';

import { postsControllerCreatePost } from '@/shared/api/generated/endpoints/posts/posts';
import type { CreatePostInputDto } from '@/shared/api/generated/model';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostInputDto) =>
      postsControllerCreatePost(payload),
    onSuccess: (createdPost) => {
      queryClient.invalidateQueries({ queryKey: postsKeys.feed() });
      queryClient.invalidateQueries({
        queryKey: postsKeys.usersPosts(createdPost.owner.userId),
      });
      queryClient.invalidateQueries({
        queryKey: profileKeys.userProfile(createdPost.owner.profileId),
      });
    },
  });
};
