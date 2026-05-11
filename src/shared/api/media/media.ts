import axios from 'axios';
import {
  filesMediaControllerConfirmUploads,
  filesMediaControllerGenerateUploadUrls,
} from '@/shared/api/generated/endpoints/core/files-media/files-media';
import type {
  GenerateUploadUrlsInputDto,
  MimeType,
} from '@/shared/api/generated/model/core';

const uploadFileToStorage = async (
  uploadUrl: string,
  file: File,
): Promise<void> => {
  await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};

export const uploadMedia = async (files: File[]): Promise<string[]> => {
  if (files.length === 0) return [];

  const payload: GenerateUploadUrlsInputDto = {
    files: files.map((file) => ({
      mimeType: file.type as MimeType,
      size: file.size,
    })),
  };

  const uploadItems = await filesMediaControllerGenerateUploadUrls(payload);
  const fileIds = uploadItems.map((item) => item.fileId);

  if (uploadItems.length !== files.length) {
    throw new Error(
      `Upload URL count mismatch. Expected ${files.length}, got ${uploadItems.length}`,
    );
  }

  await Promise.all(
    uploadItems.map((item, index) =>
      uploadFileToStorage(item.uploadUrl, files[index]),
    ),
  );

  await filesMediaControllerConfirmUploads({ fileIds });

  return fileIds;
};
