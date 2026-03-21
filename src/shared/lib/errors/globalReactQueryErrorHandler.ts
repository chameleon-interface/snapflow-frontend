import { toastError } from 'snapflow-ui-kit/client';
import axios from 'axios';

type GlobalErrorHandlerMeta = {
  globalErrorHandler?: boolean | string;
};

export function shouldSkipGlobalErrorHandler(
  meta: GlobalErrorHandlerMeta | undefined | null,
): boolean {
  return (
    meta?.globalErrorHandler === false || meta?.globalErrorHandler === 'off'
  );
}

export function showApiErrorToast(error: Error): void {
  if (!axios.isAxiosError(error)) {
    toastError(error.message || 'Something went wrong');
    return;
  }

  if (!error.response) {
    toastError('Network error. Please check your connection.');
    return;
  }

  const backendMessage = extractBackendErrorMessage(error.response.data);
  if (backendMessage) {
    toastError(backendMessage);
    return;
  }

  toastError(error.message || 'Something went wrong');
}

function extractBackendErrorMessage(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;

  const record = data as Record<string, unknown>;

  if (typeof record.message === 'string' && record.message.trim()) {
    return record.message;
  }

  if (Array.isArray(record.extensions)) {
    const messages = record.extensions
      .map((ext) => {
        if (!ext || typeof ext !== 'object') return '';
        const m = (ext as Record<string, unknown>).message;
        return typeof m === 'string' ? m : '';
      })
      .filter(Boolean);

    if (messages.length) return messages.join(' ');
  }

  return null;
}
