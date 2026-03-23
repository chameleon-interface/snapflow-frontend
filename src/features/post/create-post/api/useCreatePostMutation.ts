'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsControllerCreatePost } from '@/shared/api/generated/endpoints/posts/posts';
import type { CreatePostInputDto } from '@/shared/api/generated/model';

export const postsQueryKey = () => ['Posts'] as const;

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostInputDto) =>
      postsControllerCreatePost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryKey() });
    },
  });
};
