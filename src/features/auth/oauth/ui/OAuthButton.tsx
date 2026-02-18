'use client';

import { GoogleLogo, GitHubIcon } from 'snapflow-ui-kit/icons';
import s from './OAuthButton.module.css';

type Provider = 'google' | 'github';

type Props = {
  provider: Provider;
};
export const OAuthButton = ({ provider }: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return null;
  const icons = {
    google: <GoogleLogo />,
    github: <GitHubIcon />,
  };
  return (
    <a
      href={`${baseUrl}/auth/${provider}`}
      className={s.oauthButton}
      aria-label={`Sign in with ${provider}`}
    >
      {icons[provider]}
    </a>
  );
};
