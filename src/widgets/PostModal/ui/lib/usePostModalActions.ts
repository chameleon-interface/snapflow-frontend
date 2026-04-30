'use client';

import { toastSuccess } from 'snapflow-ui-kit/client';
import { useDeletePostMutation } from '@/features/post/delete-post';
import { useUpdatePostMutation } from '@/features/post/edit-post';
import type { PostViewDto } from '@/shared/api/generated/model';

type Params = {
  deleteSuccessMessage: string;
  description: string;
  editSuccessMessage: string;
  editedDescription: string;
  isOwner: boolean;
  onCloseAction: () => void;
  onDeleteSuccess: () => void;
  onEditSuccess: () => void;
  post: PostViewDto;
};

export const usePostModalActions = ({
  deleteSuccessMessage,
  description,
  editSuccessMessage,
  editedDescription,
  isOwner,
  onCloseAction,
  onDeleteSuccess,
  onEditSuccess,
  post,
}: Params) => {
  const { mutate: updatePost, isPending: isUpdatingPost } =
    useUpdatePostMutation();
  const { mutate: deletePost, isPending: isDeletingPost } =
    useDeletePostMutation();

  const saveChanges = () =>
    isOwner &&
    updatePost(
      {
        postId: post.id,
        description: editedDescription,
      },
      {
        onSuccess: () => {
          toastSuccess(editSuccessMessage);
          onEditSuccess();
        },
      },
    );

  const deletePostItem = () =>
    isOwner &&
    deletePost(
      {
        postId: post.id,
        userId: post.owner.userId,
        profileId: post.owner.profileId,
      },
      {
        onSuccess: () => {
          toastSuccess(deleteSuccessMessage);
          onDeleteSuccess();
          onCloseAction();
        },
      },
    );

  return {
    deletePostItem,
    isPending: isUpdatingPost || isDeletingPost,
    isSaveDisabled: editedDescription === description,
    saveChanges,
  };
};
