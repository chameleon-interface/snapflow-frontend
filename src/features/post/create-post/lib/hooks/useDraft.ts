'use client';

import { useCallback, useEffect, useState } from 'react';
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

  const handleSaveDraft = useCallback(() => {
    const { selectedPhotos, step, postStateSnapshot } = getDraftData();
    if (selectedPhotos.length > 0) {
      const draft = buildStoredDraft(selectedPhotos, step, postStateSnapshot);
      saveDraft(draft).then(() => setDraftExists(true));
    }
    doClose();
  }, [getDraftData, doClose]);

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
