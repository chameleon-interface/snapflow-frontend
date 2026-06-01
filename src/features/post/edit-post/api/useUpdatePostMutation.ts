'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsControllerEditPost } from '@/shared/api/generated/endpoints/core/posts/posts';
import type { UpdatePostInputDto } from '@/shared/api/generated/model/core';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';

type UpdatePostInput = UpdatePostInputDto & {
  postId: string;
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, description }: UpdatePostInput) =>
      postsControllerEditPost(postId, { description }),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: postsKeys.byId(variables.postId),
        }),
        queryClient.invalidateQueries({
          queryKey: postsKeys.feed(),
        }),
      ]);
    },
  });
};
