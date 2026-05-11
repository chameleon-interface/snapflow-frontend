'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsControllerDeletePost } from '@/shared/api/generated/endpoints/core/posts/posts';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';

type DeletePostInput = {
  postId: string;
  userId: string;
  profileId: string;
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: DeletePostInput) =>
      postsControllerDeletePost(postId),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: postsKeys.feed() }),
        queryClient.invalidateQueries({ queryKey: postsKeys.latest() }),
        queryClient.invalidateQueries({
          queryKey: postsKeys.usersPosts(variables.userId),
        }),
        queryClient.invalidateQueries({
          queryKey: profileKeys.userProfile(variables.profileId),
        }),
      ]);
    },
  });
};
