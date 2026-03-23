import axios from 'axios';
import {
  filesMediaControllerConfirmUploads,
  filesMediaControllerGenerateUploadUrls,
} from '@/shared/api/generated/endpoints/files-media/files-media';
import type {
  ConfirmUploadInputDto,
  GenerateUploadUrlsInputDto,
  GenerateUploadUrlViewDto,
  MimeType,
} from '@/shared/api/generated/model';

export const getUploadUrls = async (
  files: File[],
): Promise<GenerateUploadUrlViewDto[]> => {
  if (files.length === 0) return [];

  const payload: GenerateUploadUrlsInputDto = {
    files: files.map((file) => ({
      mimeType: file.type as MimeType,
      size: file.size,
    })),
  };

  return filesMediaControllerGenerateUploadUrls(payload);
};

export const uploadFileToStorage = async (
  uploadUrl: string,
  file: File,
): Promise<void> => {
  await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });
};

export const confirmUploads = async (fileIds: string[]): Promise<void> => {
  if (fileIds.length === 0) return;

  const payload: ConfirmUploadInputDto = { fileIds };

  await filesMediaControllerConfirmUploads(payload);
};

export const uploadMedia = async (files: File[]): Promise<string[]> => {
  if (files.length === 0) return [];

  const uploadItems = await getUploadUrls(files);
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

  await confirmUploads(fileIds);

  return fileIds;
};
