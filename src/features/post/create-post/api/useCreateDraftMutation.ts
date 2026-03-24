'use client';

import { useMutation } from '@tanstack/react-query';
import { postsControllerCreateDraft } from '@/shared/api/generated/endpoints/posts/posts';
import type { CreatePostInputDto } from '@/shared/api/generated/model';

export const useCreateDraftMutation = () => {
  return useMutation({
    mutationFn: (payload: CreatePostInputDto) =>
      postsControllerCreateDraft(payload),
  });
};
