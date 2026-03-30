'use client';

import { postsControllerCreateDraft } from '@/shared/api/generated/endpoints/posts/posts';
import type { CreatePostInputDto } from '@/shared/api/generated/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { openDraftQueryKey } from './useOpenDraftQuery';

export const useCreateDraftMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostInputDto) =>
      postsControllerCreateDraft(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: openDraftQueryKey() });
    },
  });
};
