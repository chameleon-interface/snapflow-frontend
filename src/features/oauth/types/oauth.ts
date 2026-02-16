export type OAuthButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

export type OAuthProvider = 'google' | 'github';

export type OAuthError =
  | 'access_denied'
  | 'expired'
  | 'invalid_state'
  | 'server_error'
  | 'unauthorized'
  | 'unknown';

export type OAuthCallbackProps = {
  provider: OAuthProvider;
};

export type OAuthCallbackState = {
  loading: boolean;
  error: OAuthError | null;
};
