'use client';

import { postsControllerCreatePost } from '@/shared/api/generated/endpoints/posts/posts';
import type { CreatePostInputDto } from '@/shared/api/generated/model';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
