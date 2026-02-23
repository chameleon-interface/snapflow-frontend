'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api';

import type { CreatePostPayload, CreatePostResponse } from '@/features/post/create-post/model/types';

const buildFormData = (payload: CreatePostPayload): FormData => {
  const formData = new FormData();
  formData.append('profileId', String(payload.profileId));
  formData.append('description', payload.description);
  payload.photoFile.forEach((file) => {
    formData.append('photoFile', file);
  });
  return formData;
};

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => {
      const formData = buildFormData(payload);
      return api.post<CreatePostResponse>('http://localhost:3001/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Posts'] });
    },
  });
};
