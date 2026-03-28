'use client';

import type { Area } from 'react-easy-crop';

const OUTPUT_FILE_EXTENSION = 'jpg';
const OUTPUT_FILE_TYPE = 'image/jpeg';
const OUTPUT_FILE_QUALITY = 0.92;

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error('Failed to load avatar source image.'));
    image.src = src;
  });

const canvasToBlob = (
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
): Promise<Blob> =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to export cropped avatar image.'));
          return;
        }

        resolve(blob);
      },
      type,
      quality,
    );
  });

const getOutputFileName = (fileName: string) => {
  const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, '');

  return `${nameWithoutExtension || 'avatar'}-cropped.${OUTPUT_FILE_EXTENSION}`;
};

type GetCroppedAvatarFileParams = {
  imageSrc: string;
  cropAreaPixels: Area;
  fileName: string;
};

export const getCroppedAvatarFile = async ({
  imageSrc,
  cropAreaPixels,
  fileName,
}: GetCroppedAvatarFileParams) => {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas 2D context is not available.');
  }

  const cropWidth = Math.round(cropAreaPixels.width);
  const cropHeight = Math.round(cropAreaPixels.height);
  const cropX = Math.round(cropAreaPixels.x);
  const cropY = Math.round(cropAreaPixels.y);

  canvas.width = cropWidth;
  canvas.height = cropHeight;

  context.drawImage(
    image,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight,
  );

  const blob = await canvasToBlob(
    canvas,
    OUTPUT_FILE_TYPE,
    OUTPUT_FILE_QUALITY,
  );

  return new File([blob], getOutputFileName(fileName), {
    type: OUTPUT_FILE_TYPE,
  });
};
