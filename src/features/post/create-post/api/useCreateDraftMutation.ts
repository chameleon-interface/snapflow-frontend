'use client';

import { useMutation } from '@tanstack/react-query';
import { postsControllerCreateDraft } from '@/shared/api/generated/endpoints/posts/posts';

import type { CreatePostPayload } from '@/features/post/create-post/model/types';

export const useCreateDraftMutation = () => {
  return useMutation({
    mutationFn: (payload: CreatePostPayload) =>
      postsControllerCreateDraft(payload),
  });
};
