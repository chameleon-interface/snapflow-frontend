'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Modal, toastSuccess } from 'snapflow-ui-kit/client';
import { useMe } from '@/entities/user';
import type { Post } from '@/entities/post';
import { useDeletePostMutation } from '@/features/delete-post';
import { useUpdatePostMutation } from '@/features/edit-post';
import { ConfirmModal } from '@/shared/ui/modals';
import { PostEdit } from './PostEdit';
import { PostView } from './PostView';
import styles from './PostModal.module.css';

type Props = {
  open: boolean;
  post: Post;
  isOwner: boolean;
  onCloseAction: () => void;
  forceOwnerActions?: boolean;
  onPostUpdated?: (post: Post) => void;
  onPostDeleted?: (postId: number) => void;
};

export const PostModal = ({
  open,
  post,
  isOwner,
  onCloseAction,
  forceOwnerActions = false,
  onPostUpdated,
  onPostDeleted,
}: Props) => {
  const t = useTranslations('Modals.Post');
  const { data: me } = useMe();
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [draftDescription, setDraftDescription] = useState(post.description);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isCloseEditConfirmOpen, setIsCloseEditConfirmOpen] = useState(false);
  const { mutate: updatePost, isPending: isUpdatingPost } =
    useUpdatePostMutation();
  const { mutate: deletePost, isPending: isDeletingPost } =
    useDeletePostMutation();
  const isAuthorized = Boolean(me);
  const canManagePost =
    isAuthorized &&
    (forceOwnerActions ||
      (isOwner && me?.userId === String(post.owner.ownerId)));
  const isDirty = draftDescription !== post.description;
  const ownerName = post.owner.username ?? me?.username ?? 'UserName';
  const ownerAvatar = post.owner.avatarUrl ?? null;
  const postPhotos = post.postMedias.map(({ url }) => url).filter(Boolean);
  const closeModal = () =>
    mode === 'edit' && isDirty
      ? setIsCloseEditConfirmOpen(true)
      : onCloseAction();
  const saveChanges = () =>
    canManagePost &&
    updatePost(
      { postId: post.id, description: draftDescription },
      {
        onSuccess: () => {
          toastSuccess(t('editSuccess'));
          setMode('view');
          onPostUpdated?.({ ...post, description: draftDescription });
        },
      },
    );
  const deletePostItem = () =>
    canManagePost &&
    deletePost(
      { postId: post.id },
      {
        onSuccess: () => {
          toastSuccess(t('deleteSuccess'));
          setIsDeleteConfirmOpen(false);
          onPostDeleted?.(post.id);
          onCloseAction();
        },
      },
    );
  const resetEdit = () => {
    setIsCloseEditConfirmOpen(false);
    setDraftDescription(post.description);
    setMode('view');
  };
  const modalClassName =
    mode === 'edit' ? styles.modalContainer : styles.viewModalContainer;

  return (
    <>
      <Modal
        open={open}
        onClose={closeModal}
        title={mode === 'edit' ? t('editTitle') : ''}
        className={modalClassName}
      >
        {mode === 'edit' ? (
          <PostEdit
            description={draftDescription}
            isPending={isUpdatingPost || isDeletingPost}
            isSaveDisabled={!isDirty}
            maxLength={500}
            ownerAvatar={ownerAvatar}
            ownerName={ownerName}
            previewPhotoUrl={postPhotos[0] ?? null}
            onChange={setDraftDescription}
            onSave={saveChanges}
          />
        ) : (
          <PostView
            canManagePost={canManagePost}
            isAuthorized={isAuthorized}
            ownerAvatar={ownerAvatar}
            ownerName={ownerName}
            post={post}
            postPhotos={postPhotos}
            onDelete={() => setIsDeleteConfirmOpen(true)}
            onEdit={() => {
              setDraftDescription(post.description);
              setMode('edit');
            }}
          />
        )}
      </Modal>
      <ConfirmModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={deletePostItem}
        title={t('deleteTitle')}
        message={t('deleteMessage')}
      />
      <ConfirmModal
        isOpen={isCloseEditConfirmOpen}
        onClose={() => setIsCloseEditConfirmOpen(false)}
        onConfirm={resetEdit}
        title={t('closeTitle')}
        message={t('closeMessage')}
      />
    </>
  );
};
