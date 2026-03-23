'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';
import type { CreateDraftResponse } from '@/features/post/create-post/model/types';

export const openDraftQueryKey = () => ['post', 'drafts'] as const;

type UseOpenDraftQueryOptions = {
  enabled?: boolean;
};

export const useOpenDraftQuery = (options?: UseOpenDraftQueryOptions) => {
  const { enabled = true } = options ?? {};

  return useQuery({
    queryKey: openDraftQueryKey(),
    queryFn: async () => {
      const { data } = await api.get<CreateDraftResponse[]>('/posts/drafts');
      return data;
    },
    enabled,
  });
};
