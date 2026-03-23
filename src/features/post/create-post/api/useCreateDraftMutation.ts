'use client';

import { api } from '@/shared/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { openDraftQueryKey } from './useOpenDraftQuery';

import type {
  CreatePostPayload,
  CreateDraftResponse,
} from '@/features/post/create-post/model/types';

export const useCreateDraftMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => {
      return api.post<CreateDraftResponse>('/posts/draft', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: openDraftQueryKey() });
    },
  });
};
