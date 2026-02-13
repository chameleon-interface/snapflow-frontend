import { SetNewPasswordPage } from '@/pages-layer/password-recovery/ui';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: Promise<{ recoveryCode?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { recoveryCode } = await searchParams;
  if (!recoveryCode) redirect('/password-recovery/request-reset');

  return <SetNewPasswordPage recoveryCode={recoveryCode} />;
}
