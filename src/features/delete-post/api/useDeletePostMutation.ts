'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postQueryKeys, type DeletePostInput } from '@/entities/post';
import { postsControllerDeletePost } from '@/shared/api/generated/endpoints/posts/posts';
import { mainPageKeys } from '@/shared/api/keys-factories/mainPageKeysFactory';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: DeletePostInput) =>
      postsControllerDeletePost(postId),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: postQueryKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: postsKeys.usersPosts(variables.ownerId),
        }),
        queryClient.invalidateQueries({
          queryKey: mainPageKeys.posts(),
        }),
        queryClient.invalidateQueries({
          queryKey: profileKeys.userProfile(variables.ownerId),
        }),
      ]);

      queryClient.removeQueries({
        queryKey: postQueryKeys.byId(variables.postId),
      });
    },
  });
};
