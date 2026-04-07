'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postQueryKeys, updatePost } from '@/entities/post';
import { mainPageKeys } from '@/shared/api/keys-factories/mainPageKeysFactory';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
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
        queryClient.invalidateQueries({
          queryKey: postQueryKeys.byId(variables.postId),
        }),
      ]);
    },
  });
};
