import { SetNewPasswordPage } from '@/pages-layer/password-recovery/ui';
import { ROUTES } from '@/shared/config';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: Promise<{ recoveryCode?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { recoveryCode } = await searchParams;
  if (!recoveryCode) redirect(ROUTES.PASSWORD_RECOVERY);

  return <SetNewPasswordPage recoveryCode={recoveryCode} />;
}
