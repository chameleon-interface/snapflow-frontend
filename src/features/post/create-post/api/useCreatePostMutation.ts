'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api';

import type {
  CreatePostPayload,
  CreatePostResponse,
} from '@/features/post/create-post/model/types';

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => {
      return api.post<CreatePostResponse>('/posts', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Posts'] });
    },
  });
};
