'use client';

import { useQuery } from '@tanstack/react-query';
import {
  postsControllerGetPostById,
  postsControllerGetPublicPost,
} from '@/shared/api/generated/endpoints/posts/posts';
import type { PostViewDto } from '@/shared/api/generated/model';
import { postsKeys } from '@/shared/api/keys-factories/postsKeysFactory';

type Params = {
  initialPost?: PostViewDto | null;
  isOwner: boolean;
  postId: string | null;
};

export const usePostByIdQuery = ({ initialPost, isOwner, postId }: Params) => {
  return useQuery({
    queryKey: postsKeys.byId(postId ?? 'unknown', isOwner),
    queryFn: () =>
      isOwner && postId
        ? postsControllerGetPostById(postId)
        : postsControllerGetPublicPost(postId!),
    enabled: postId != null,
    placeholderData: initialPost ?? undefined,
    staleTime: 60 * 1000,
  });
};
