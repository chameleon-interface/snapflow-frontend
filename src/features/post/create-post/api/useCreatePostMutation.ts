'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsControllerCreatePost } from '@/shared/api/generated/endpoints/posts/posts';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import type { CreatePostInputDto } from '@/shared/api/generated/model';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostInputDto) =>
      postsControllerCreatePost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.all });
    },
  });
};
