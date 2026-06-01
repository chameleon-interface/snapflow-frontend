'use client';

import axios from 'axios';
import { postsControllerGetDraft } from '@/shared/api/generated/endpoints/core/posts/posts';
import type { PostViewDto } from '@/shared/api/generated/model/core';
import { useQuery } from '@tanstack/react-query';

export const openDraftQueryKey = () => ['Drafts'] as const;

type UseOpenDraftQueryOptions = {
  enabled?: boolean;
};

export const useOpenDraftQuery = (options?: UseOpenDraftQueryOptions) => {
  const { enabled = true } = options ?? {};

  return useQuery<PostViewDto | null>({
    queryKey: openDraftQueryKey(),
    queryFn: async () => {
      try {
        return await postsControllerGetDraft();
      } catch (error) {
        const isDraftMissing =
          axios.isAxiosError(error) && error.response?.status === 404;

        // Нет черновика — это валидный empty-state, не ошибка.
        if (isDraftMissing) {
          return null;
        }

        throw error;
      }
    },
    enabled,
    retry: false,
    meta: { globalErrorHandler: false },
  });
};
