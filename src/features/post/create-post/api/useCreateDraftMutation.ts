'use client';

import { postsControllerSaveDraft } from '@/shared/api/generated/endpoints/core/posts/posts';
import type { CreatePostInputDto } from '@/shared/api/generated/model/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { openDraftQueryKey } from './useOpenDraftQuery';

export const useCreateDraftMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostInputDto) =>
      postsControllerSaveDraft(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: openDraftQueryKey() });
    },
  });
};
