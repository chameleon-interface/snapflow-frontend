'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import type { Area, Point } from 'react-easy-crop';

export const DEFAULT_CROP: Point = { x: 0, y: 0 };
export const DEFAULT_ZOOM = 1;

type AvatarCropDraft = {
  imageSrc: string;
  fileName: string;
  crop: Point;
  zoom: number;
  croppedAreaPixels: Area | null;
};

export const useAvatarCropDraft = () => {
  const selectedAvatarUrlRef = useRef<string | null>(null);
  const [cropDraft, setCropDraft] = useState<AvatarCropDraft | null>(null);

  useEffect(() => {
    return () => {
      if (selectedAvatarUrlRef.current) {
        URL.revokeObjectURL(selectedAvatarUrlRef.current);
      }
    };
  }, []);

  const resetCropDraft = () => {
    if (selectedAvatarUrlRef.current) {
      URL.revokeObjectURL(selectedAvatarUrlRef.current);
      selectedAvatarUrlRef.current = null;
    }

    setCropDraft(null);
  };

  const openCropDraft = (event: ChangeEvent<HTMLInputElement>) => {
    const avatar = event.target.files?.[0];

    if (!avatar) {
      event.target.value = '';
      return false;
    }

    if (selectedAvatarUrlRef.current) {
      URL.revokeObjectURL(selectedAvatarUrlRef.current);
    }

    const objectUrl = URL.createObjectURL(avatar);

    selectedAvatarUrlRef.current = objectUrl;

    setCropDraft({
      imageSrc: objectUrl,
      fileName: avatar.name,
      crop: DEFAULT_CROP,
      zoom: DEFAULT_ZOOM,
      croppedAreaPixels: null,
    });

    event.target.value = '';

    return true;
  };

  const setCrop = (nextCrop: Point) => {
    setCropDraft((currentDraft) =>
      currentDraft
        ? {
            ...currentDraft,
            crop: nextCrop,
          }
        : currentDraft,
    );
  };

  const setZoom = (nextZoom: number) => {
    setCropDraft((currentDraft) =>
      currentDraft
        ? {
            ...currentDraft,
            zoom: nextZoom,
          }
        : currentDraft,
    );
  };

  const setCroppedAreaPixels = (nextCroppedAreaPixels: Area) => {
    setCropDraft((currentDraft) =>
      currentDraft
        ? {
            ...currentDraft,
            croppedAreaPixels: nextCroppedAreaPixels,
          }
        : currentDraft,
    );
  };

  return {
    cropDraft,
    isCropModalOpen: cropDraft !== null,
    openCropDraft,
    resetCropDraft,
    setCrop,
    setZoom,
    setCroppedAreaPixels,
  };
};
