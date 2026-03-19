'use client';

import { api } from '@/shared/api';
import { useQuery } from '@tanstack/react-query';

import type { CreateDraftResponse } from '@/features/post/create-post/model/types';

const postQueryKey = (id: string) => ['post', String(id)] as const;

export const useGetPostQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: postQueryKey(id ?? ''),
    queryFn: async () => {
      const { data } = await api.get<CreateDraftResponse>(`/posts/${id}`);
      return data;
    },
  });
};
