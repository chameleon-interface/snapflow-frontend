'use client';

import type { OAuthError } from '@/features/oauth/types';

type Props = {
  error: OAuthError;
};

const errorMap: Record<OAuthError, string> = {
  access_denied: 'Access denied',
  expired: 'Authorization expired',
  invalid_state: 'Invalid authorization state',
  server_error: 'Server error',
  unauthorized: 'User is not authenticated',
  unknown: 'Unknown error',
};

export function OAuthErrorState({ error }: Props) {
  return (
    <div style={{ textAlign: 'center', padding: 32 }}>
      <h2>Authorization error</h2>
      <p>{errorMap[error]}</p>
    </div>
  );
}
