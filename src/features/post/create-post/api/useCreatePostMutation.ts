'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postsControllerCreatePost } from '@/shared/api/generated/endpoints/posts/posts';

import type { CreatePostPayload } from '@/features/post/create-post/model/types';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) =>
      postsControllerCreatePost(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Posts'] });
    },
  });
};
