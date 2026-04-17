'use client';

import { toastSuccess } from 'snapflow-ui-kit/client';
import { useDeletePostMutation } from '@/features/post/delete-post';
import { useUpdatePostMutation } from '@/features/post/edit-post';
import type { PostViewDto } from '@/shared/api/generated/model';

type Params = {
  description: string;
  editedDescription: string;
  isOwner: boolean;
  onCloseAction: () => void;
  onDeleteSuccess: () => void;
  onEditSuccess: () => void;
  post: PostViewDto;
  t: (key: 'deleteSuccess' | 'editSuccess') => string;
};

export const usePostModalActions = ({
  description,
  editedDescription,
  isOwner,
  onCloseAction,
  onDeleteSuccess,
  onEditSuccess,
  post,
  t,
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
        ownerId: post.owner.ownerId,
        description: editedDescription,
      },
      {
        onSuccess: () => {
          toastSuccess(t('editSuccess'));
          onEditSuccess();
        },
      },
    );

  const deletePostItem = () =>
    isOwner &&
    deletePost(
      { postId: post.id, ownerId: post.owner.ownerId },
      {
        onSuccess: () => {
          toastSuccess(t('deleteSuccess'));
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
