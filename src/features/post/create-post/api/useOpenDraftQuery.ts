'use client';

import { postsControllerGetMyDrafts } from '@/shared/api/generated/endpoints/posts/posts';
import { useQuery } from '@tanstack/react-query';

export const openDraftQueryKey = () => ['Drafts'] as const;

type UseOpenDraftQueryOptions = {
  enabled?: boolean;
};

export const useOpenDraftQuery = (options?: UseOpenDraftQueryOptions) => {
  const { enabled = true } = options ?? {};

  return useQuery({
    queryKey: openDraftQueryKey(),
    queryFn: () => postsControllerGetMyDrafts(),
    enabled,
  });
};
