'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toastError } from 'snapflow-ui-kit/client';
import type {
  CreatePostStep,
  DraftPostState,
} from '@/features/post/create-post/model/types';
import type { RestoreDraftResult } from '../utils/restoreDraftExports';
import {
  hasDraft as checkHasDraft,
  loadDraft,
  saveDraft,
  clearDraft,
  buildStoredDraft,
} from '../utils/draftStorage';
import { restoreDraftExports } from '../utils/restoreDraftExports';

type GetDraftData = () => {
  selectedPhotos: File[];
  step: CreatePostStep;
  postStateSnapshot: DraftPostState;
};

type OnRestore = (
  result: RestoreDraftResult & { postState: DraftPostState },
) => void;

type Params = {
  doClose: () => void;
  getDraftData: GetDraftData;
  onRestore: OnRestore;
};

export const useDraft = ({ doClose, getDraftData, onRestore }: Params) => {
  const t = useTranslations('CreatePost');
  const [isDraftLoading, setIsDraftLoading] = useState(false);
  const [draftExists, setDraftExists] = useState(false);

  useEffect(() => {
    checkHasDraft().then(setDraftExists);
  }, []);

  const loadDraftAndRestore = useCallback(async () => {
    const draft = await loadDraft();
    if (!draft?.photoBlobs?.length) return;
    setIsDraftLoading(true);
    try {
      const result = await restoreDraftExports(draft);
      onRestore({
        ...result,
        postState: draft.postState,
      });
    } finally {
      setIsDraftLoading(false);
    }
  }, [onRestore]);

  const handleSaveDraft = useCallback(async () => {
    const { selectedPhotos, step, postStateSnapshot } = getDraftData();
    if (selectedPhotos.length === 0) {
      doClose();
      return;
    }
    try {
      const draft = buildStoredDraft(selectedPhotos, step, postStateSnapshot);
      await saveDraft(draft);
      setDraftExists(true);
      doClose();
    } catch {
      toastError(t('draftSaveError'));
      throw new Error('Draft save failed');
    }
  }, [getDraftData, doClose, t]);

  const handleDiscard = useCallback(() => {
    clearDraft().then(() => setDraftExists(false));
    doClose();
  }, [doClose]);

  return {
    draftExists,
    isDraftLoading,
    loadDraftAndRestore,
    handleSaveDraft,
    handleDiscard,
  };
};
