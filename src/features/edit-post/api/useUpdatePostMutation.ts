'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postQueryKeys, type UpdatePostInput } from '@/entities/post';
import { postsControllerEditPost } from '@/shared/api/generated/endpoints/posts/posts';
import { mainPageKeys } from '@/shared/api/keys-factories/mainPageKeysFactory';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import { profileKeys } from '@/shared/api/keys-factories/profileKeysFactory';

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, description }: UpdatePostInput) =>
      postsControllerEditPost(postId, { description }),
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
