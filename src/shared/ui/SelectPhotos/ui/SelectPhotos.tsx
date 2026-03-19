'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useRef } from 'react';
import { Button } from 'snapflow-ui-kit';
import { ImageIcon } from 'snapflow-ui-kit/icons';
import {
  getPhotoNames,
  mergeSelectedFiles,
  processSelectedFiles,
  type ValidationError,
} from '../lib';
import { ACCEPT_IMAGE } from '../model/constants';
import styles from './SelectPhotos.module.css';

type Props = {
  photos: File[];
  onSelectPhotos: (photos: File[]) => void;
  multiple?: boolean;
  onError: (error: string | null) => void;
};

export const SelectPhotos = ({
  photos,
  onSelectPhotos,
  multiple = false,
  onError,
}: Props) => {
  const t = useTranslations('SelectPhotos');
  const tValidation = useTranslations('Validation.selectPhotos');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const alreadySelectedNames = useMemo(() => getPhotoNames(photos), [photos]);

  const handleSelectClick = () => {
    onError(null);
    fileInputRef.current?.click();
  };

  const applySelectedFiles = (files: FileList | null) => {
    if (!files?.length) return;
    onSelectPhotos(mergeSelectedFiles(files, photos, multiple));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    onError(null);
    processSelectedFiles(files ?? null, {
      multiple,
      alreadySelectedCount: photos.length,
      alreadySelectedNames,
      onFilesProcessed: applySelectedFiles,
      onError: (error: ValidationError | null) => {
        if (!error) {
          onError(null);
          return;
        }

        // `error.key` is a leaf key under `Validation.selectPhotos`.
        // `error.values` contains exactly the placeholders required by that key.
        onError(tValidation(error.key, error.values));
      },
    });
    e.target.value = '';
  };

  return (
    <div
      role="group"
      aria-label={t('selectFromComputer')}
      className={styles.selectPhotos}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPT_IMAGE}
        multiple={multiple}
        aria-hidden
        onChange={handleFileChange}
        className={styles.hiddenInput}
        tabIndex={-1}
      />

      <div
        className={styles.photoPlaceholder}
        onClick={handleSelectClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSelectClick();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={t('selectFromComputer')}
      >
        <span className={styles.iconWrap} aria-hidden>
          <ImageIcon width={36} height={36} aria-hidden />
        </span>
      </div>

      <Button
        className={styles.selectButton}
        onClick={handleSelectClick}
        aria-label={t('selectFromComputer')}
        type="button"
        variant="primary"
      >
        {t('selectFromComputer')}
      </Button>
    </div>
  );
};
