'use client';

import { useTranslations } from 'next-intl';
import { Modal } from 'snapflow-ui-kit/client';
import { useMe } from '@/entities/user';
import type { PostViewDto } from '@/shared/api/generated/model';
import { ConfirmModal } from '@/shared/ui/modals';
import { usePostModalActions } from './lib/usePostModalActions';
import { usePostModalState } from './lib/usePostModalState';
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
  const description = post.description ?? '';
  const {
    closeModal,
    confirmModal,
    editedDescription,
    mode,
    openEdit,
    resetEdit,
    setConfirmModal,
    setEditedDescription,
    setMode,
  } = usePostModalState({
    description,
    onCloseAction,
    open,
  });
  const { deletePostItem, isPending, isSaveDisabled, saveChanges } =
    usePostModalActions({
      description,
      editedDescription,
      isOwner,
      onCloseAction,
      onDeleteSuccess: () => setConfirmModal(null),
      onEditSuccess: () => setMode('view'),
      post,
      t,
    });
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
            isPending={isPending}
            isSaveDisabled={isSaveDisabled}
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
