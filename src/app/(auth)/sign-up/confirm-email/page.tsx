import { redirect } from 'next/navigation';
import { ConfirmEmailPage } from '@/pages-layer/confirm-email';
import { ROUTES } from '@/shared/config';

type Props = {
  searchParams: Promise<{ code?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const { code } = await searchParams;
  if (!code) redirect(ROUTES.HOME);

  return <ConfirmEmailPage code={code} />;
}
