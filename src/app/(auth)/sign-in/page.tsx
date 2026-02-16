import { SignInPage } from '@/pages-layer/sign-in';
import { GoogleOAuthButton } from '@/features/oauth/google/ui/GoogleOAuthButton';
import { GitHubOAuthButton } from '@/features/oauth';

export default function Page() {
  return (
    <div>
      <SignInPage />
      <GoogleOAuthButton />
      <GitHubOAuthButton />
    </div>
  );
}
