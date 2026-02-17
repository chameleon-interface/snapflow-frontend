'use client';

import { useOAuthCallback } from '@/features/oauth/model/useOAuthCallback';
import { OAuthLoadingState } from './OAuthLoadingState';
import { OAuthErrorState } from './OAuthErrorState';

export function AuthCallbackPage() {
  const { loading, error } = useOAuthCallback();

  if (loading) return <OAuthLoadingState />;
  if (error) return <OAuthErrorState error={error} />;

  return null;
}
