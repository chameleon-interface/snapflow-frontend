'use client';

import { GitHubIcon } from 'snapflow-ui-kit/icons';
import type { OAuthButtonProps } from '@/features/oauth/types';

export const GitHubOAuthButton = ({
  disabled = false,
  loading = false,
  className,
}: OAuthButtonProps) => {
  const handleClick = () => {
    if (disabled || loading) return;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) return;

    window.location.href = `${baseUrl}/api/v1/auth/github`;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={className}
      aria-label="Sign in with GitHub"
    >
      <GitHubIcon />
    </button>
  );
};
