import type { ApiErrorResponse } from '@/shared/api';
import { toastError } from 'snapflow-ui-kit/client';
import axios from 'axios';

type GlobalErrorHandlerMeta = {
  meta?: { globalErrorHandler?: boolean | string };
};

export function handleGlobalReactQueryMutationError(
  error: Error,
  _variables: unknown,
  _onMutateResult: unknown,
  context: GlobalErrorHandlerMeta,
): void {
  const { meta } = context;
  if (
    meta?.globalErrorHandler === false ||
    meta?.globalErrorHandler === 'off'
  ) {
    return;
  }

  handleGlobalReactQueryError(error);
}

export function handleGlobalReactQueryError(error: Error): void {
  showErrorToast(error);
}

function showErrorToast(error: Error): void {
  if (!axios.isAxiosError(error)) {
    toastError(error.message || 'Something went wrong');
    return;
  }

  if (!error.response) {
    toastError('Network error. Please check your connection.');
    return;
  }

  const data = error.response.data;

  if (isValidApiError(data)) {
    if (data.message) {
      toastError(data.message);
    } else if (data.extensions?.length) {
      const messages = data.extensions
        .map((ext) => ext.message)
        .filter(Boolean)
        .join(' ');
      toastError(messages);
    } else {
      toastError('Something went wrong');
    }
  } else {
    toastError(error.message || 'Something went wrong');
  }
}

function isValidApiError(data: unknown): data is ApiErrorResponse {
  if (!data || typeof data !== 'object') return false;

  const candidate = data as Partial<ApiErrorResponse>;

  return (
    'message' in candidate &&
    typeof candidate.message === 'string' &&
    (!candidate.extensions || Array.isArray(candidate.extensions))
  );
}
