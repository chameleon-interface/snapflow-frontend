import type { AxiosError } from 'axios';
import type { ApiErrorResponse } from '@/shared/api/types';
import type { OAuthError } from '../types/oauth';

export function mapOAuthError(error: AxiosError<ApiErrorResponse>): OAuthError {
  const code = error.response?.data?.code;

  switch (code) {
    case 'access_denied':
      return 'access_denied';
    case 'expired':
      return 'expired';
    case 'invalid_state':
      return 'invalid_state';
    case 'server_error':
      return 'server_error';
    default:
      return 'unknown';
  }
}
