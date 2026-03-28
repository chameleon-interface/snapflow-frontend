import { toastError } from 'snapflow-ui-kit/client';
import axios from 'axios';

export type ReactQueryApiErrorSkipMeta = {
  globalErrorHandler?: boolean;
};

export type ReactQueryApiErrorToastMessages = {
  genericError: string;
  networkError: string;
};

export function reactQueryApiErrorHandler(
  error: Error,
  messages: ReactQueryApiErrorToastMessages,
): void {
  if (!axios.isAxiosError(error)) {
    toastError(error.message || messages.genericError);
    return;
  }

  if (!error.response) {
    toastError(messages.networkError);
    return;
  }

  const backendMessage = extractBackendErrorMessage(error.response.data);
  if (backendMessage) {
    toastError(backendMessage);
    return;
  }

  toastError(error.message || messages.genericError);
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
