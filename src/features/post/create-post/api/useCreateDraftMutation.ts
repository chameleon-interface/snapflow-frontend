'use client';

import { api } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

import type {
  CreatePostPayload,
  CreatePostResponse,
} from '@/features/post/create-post/model/types';

export const useCreateDraftMutation = () => {
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => {
      return api.post<CreatePostResponse>('/posts/draft', payload);
    },
  });
};
