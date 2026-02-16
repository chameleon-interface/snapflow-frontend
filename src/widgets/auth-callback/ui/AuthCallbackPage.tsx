'use client';

import type { OAuthCallbackProps } from '@/features/oauth/types';
import { useOAuthCallback } from '@/features/oauth/model/useOAuthCallback';

import { OAuthLoadingState } from './OAuthLoadingState';
import { OAuthErrorState } from './OAuthErrorState';

export function AuthCallbackPage({ provider }: OAuthCallbackProps) {
  const { loading, error } = useOAuthCallback();

  if (loading) return <OAuthLoadingState provider={provider} />;
  if (error) return <OAuthErrorState error={error} />;

  return null;
}
