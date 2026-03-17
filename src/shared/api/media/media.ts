import axios from 'axios';
import { api } from '../instance';
import {
  ConfirmUploadsRequest,
  GetUploadUrlsRequest,
  GetUploadUrlsResponse,
  UploadUrlItem,
} from './types';

export const getUploadUrls = async (
  files: File[],
): Promise<UploadUrlItem[]> => {
  if (files.length === 0) return [];

  const payload: GetUploadUrlsRequest = {
    files: files.map((file) => ({
      mimeType: file.type,
      size: file.size,
    })),
  };

  const { data } = await api.post<GetUploadUrlsResponse>(
    '/media/upload-url',
    payload,
  );

  return data;
};

export const uploadFileToStorage = async (
  uploadUrl: string,
  file: File,
): Promise<void> => {
  await axios.put(uploadUrl, file, {
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
    },
  });
};

export const confirmUploads = async (fileIds: string[]): Promise<void> => {
  if (fileIds.length === 0) return;

  const payload: ConfirmUploadsRequest = { fileIds };

  await api.post('/media/confirm-uploads', payload);
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
