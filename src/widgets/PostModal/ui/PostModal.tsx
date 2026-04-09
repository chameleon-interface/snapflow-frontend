'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Modal, toastSuccess } from 'snapflow-ui-kit/client';
import { useMe } from '@/entities/user';
import { useDeletePostMutation } from '@/features/post/delete-post';
import { useUpdatePostMutation } from '@/features/post/edit-post';
import type { PostViewDto } from '@/shared/api/generated/model';
import { ConfirmModal } from '@/shared/ui/modals';
import { PostEdit } from './PostEdit';
import { PostView } from './PostView';
import styles from './PostModal.module.css';

type Props = {
  open: boolean;
  post: PostViewDto;
  isOwner: boolean;
  onCloseAction: () => void;
};

export const PostModal = ({ open, post, isOwner, onCloseAction }: Props) => {
  const t = useTranslations('Modals.Post');
  const { data: me } = useMe();
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [editedDescription, setEditedDescription] = useState(
    post.description ?? '',
  );
  const [confirmModal, setConfirmModal] = useState<
    'delete' | 'close-edit' | null
  >(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open, mode, confirmModal]);

  const { mutate: updatePost, isPending: isUpdatingPost } =
    useUpdatePostMutation();

  const { mutate: deletePost, isPending: isDeletingPost } =
    useDeletePostMutation();

  const closeModal = () =>
    mode === 'edit' ? setConfirmModal('close-edit') : onCloseAction();
  const openEdit = () => {
    setEditedDescription(post.description ?? '');
    setMode('edit');
  };
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
          setMode('view');
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
          setConfirmModal(null);
          onCloseAction();
        },
      },
    );
  const resetEdit = () => {
    setConfirmModal(null);
    setEditedDescription(post.description ?? '');
    setMode('view');
  };
  const modalClassName =
    mode === 'edit' ? styles.modalContainer : styles.viewModalContainer;

  return (
    <>
      <Modal
        open={open}
        onClose={closeModal}
        title={mode === 'edit' ? t('editTitle') : t('viewTitle')}
        className={modalClassName}
      >
        {mode === 'edit' ? (
          <PostEdit
            description={editedDescription}
            isPending={isUpdatingPost || isDeletingPost}
            isSaveDisabled={editedDescription === (post.description ?? '')}
            maxLength={500}
            owner={post.owner}
            previewPhotoUrl={post.postMedias[0]?.url ?? null}
            onChange={setEditedDescription}
            onSave={saveChanges}
          />
        ) : (
          <PostView
            isOwner={isOwner}
            post={post}
            showPublishBar={me != null}
            onDelete={() => setConfirmModal('delete')}
            onEdit={openEdit}
          />
        )}
      </Modal>
      <ConfirmModal
        isOpen={confirmModal === 'delete'}
        onClose={() => setConfirmModal(null)}
        onConfirm={deletePostItem}
        title={t('deleteTitle')}
        message={t('deleteMessage')}
      />
      <ConfirmModal
        isOpen={confirmModal === 'close-edit'}
        onClose={() => setConfirmModal(null)}
        onConfirm={resetEdit}
        title={t('closeTitle')}
        message={t('closeMessage')}
      />
    </>
  );
};
