'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsControllerDeletePost } from '@/shared/api/generated/endpoints/posts/posts';
import { mainPageKeys } from '@/shared/api/keys-factories/mainPageKeysFactory';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';

type DeletePostInput = {
  postId: string;
  ownerId: string;
};

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: DeletePostInput) =>
      postsControllerDeletePost(postId),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: postsKeys.byId(variables.postId),
        }),
        queryClient.invalidateQueries({
          queryKey: postsKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: mainPageKeys.posts(),
        }),
        queryClient.invalidateQueries({
          queryKey: profileKeys.userProfile(variables.ownerId),
        }),
      ]);
    },
  });
};
