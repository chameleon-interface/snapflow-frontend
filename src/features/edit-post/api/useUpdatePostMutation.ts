'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postQueryKeys, updatePost } from '@/entities/post';

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: postQueryKeys.all,
      });

      await queryClient.invalidateQueries({
        queryKey: postQueryKeys.byId(variables.postId),
      });
    },
  });
};
