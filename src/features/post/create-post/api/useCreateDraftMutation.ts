'use client';

import { api } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

import type {
  CreatePostPayload,
  PostWithMedia,
} from '@/features/post/create-post/model/types';

export const useCreateDraftMutation = () => {
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => {
      return api.post<PostWithMedia>('/posts/draft', payload);
    },
  });
};
