export type MediaFileDescriptor = {
  mimeType: string;
  size: number;
};

export type GetUploadUrlsRequest = {
  files: MediaFileDescriptor[];
};

export type UploadUrlItem = {
  uploadUrl: string;
  fileId: string;
};

export type GetUploadUrlsResponse = UploadUrlItem[];

export type ConfirmUploadsRequest = {
  fileIds: string[];
};
