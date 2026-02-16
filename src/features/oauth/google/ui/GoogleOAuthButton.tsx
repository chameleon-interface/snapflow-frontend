'use client';

import { GoogleLogo } from 'snapflow-ui-kit/icons';
import type { OAuthButtonProps } from '@/features/oauth/types';

export const GoogleOAuthButton = ({
  disabled = false,
  loading = false,
  className,
}: OAuthButtonProps) => {
  const handleClick = () => {
    if (disabled || loading) return;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      console.error('NEXT_PUBLIC_API_URL is not defined');
      return;
    }

    window.location.href = `${baseUrl}/api/v1/auth/google`;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || loading}
      className={className}
      aria-label="Sign in with Google"
    >
      <GoogleLogo />
    </button>
  );
};
