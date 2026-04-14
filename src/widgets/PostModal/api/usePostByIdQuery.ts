'use client';

import { useQuery } from '@tanstack/react-query';
import { postsControllerGetPostById } from '@/shared/api/generated/endpoints/posts/posts';
import type { PostViewDto } from '@/shared/api/generated/model';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';

type Params = {
  initialPost?: PostViewDto | null;
  postId: string | null;
};

export const usePostByIdQuery = ({ initialPost, postId }: Params) => {
  return useQuery({
    queryKey: postsKeys.byId(postId ?? 'unknown'),
    queryFn: () => postsControllerGetPostById(postId!),
    enabled: postId != null,
    placeholderData: initialPost ?? undefined,
    staleTime: 60 * 1000,
  });
};
