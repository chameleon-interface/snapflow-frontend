'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost, postQueryKeys } from '@/entities/post';

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: postQueryKeys.all,
      });

      queryClient.removeQueries({
        queryKey: postQueryKeys.byId(variables.postId),
      });
    },
  });
};
