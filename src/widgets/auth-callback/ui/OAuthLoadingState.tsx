'use client';

import type { OAuthProvider } from '@/features/oauth/types';

type Props = {
  provider: OAuthProvider;
};

export function OAuthLoadingState({ provider }: Props) {
  return (
    <div style={{ textAlign: 'center', padding: 32 }}>
      <h2>{provider} authorization</h2>
      <p>Authorizing… Please wait</p>
      <div style={{ marginTop: 16 }}>⏳</div>
    </div>
  );
}
