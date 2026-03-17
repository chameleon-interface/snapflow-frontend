'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api';

import type {
  CreatePostPayload,
  PostWithMedia,
} from '@/features/post/create-post/model/types';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => {
      return api.post<PostWithMedia>('/posts', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Posts'] });
    },
  });
};
