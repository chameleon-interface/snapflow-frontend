'use client';

import { SelectPhotos } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Alert, Button } from 'snapflow-ui-kit';
import styles from './AddPhotos.module.css';

type Props = {
  selectedPhotos: File[];
  setSelectedPhotos: (photos: File[]) => void;
  onOpenDraft?: () => void;
};

export const AddPhotos = ({
  selectedPhotos,
  setSelectedPhotos,
  onOpenDraft,
}: Props) => {
  const t = useTranslations('CreatePost');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    queueMicrotask(() => setError(null));
  }, [selectedPhotos]);

  return (
    <>
      {error && (
        <Alert
          variant="error"
          message={error}
          onClose={() => setError(null)}
          className={styles.error}
        />
      )}
      <div className={styles.content}>
        <SelectPhotos
          photos={selectedPhotos}
          onSelectPhotos={setSelectedPhotos}
          onError={setError}
          multiple
        />
        <Button
          className={styles.openDraftButton}
          variant="outlined"
          onClick={() => onOpenDraft?.()}
          aria-label={t('openDraft')}
        >
          {t('openDraft')}
        </Button>
      </div>
    </>
  );
};
