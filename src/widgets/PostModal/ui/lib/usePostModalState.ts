import { useEffect, useState } from 'react';

type Params = {
  description: string;
  onCloseAction: () => void;
  open: boolean;
};

export const usePostModalState = ({
  description,
  onCloseAction,
  open,
}: Params) => {
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [editedDescription, setEditedDescription] = useState(description);
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
  }, [open]);

  const closeModal = () =>
    mode === 'edit' ? setConfirmModal('close-edit') : onCloseAction();

  const openEdit = () => {
    setEditedDescription(description);
    setMode('edit');
  };

  const resetEdit = () => {
    setConfirmModal(null);
    setEditedDescription(description);
    setMode('view');
  };

  return {
    closeModal,
    confirmModal,
    editedDescription,
    mode,
    openEdit,
    resetEdit,
    setConfirmModal,
    setEditedDescription,
    setMode,
  };
};
