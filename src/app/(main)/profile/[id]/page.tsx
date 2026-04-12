import { ProfilePage } from '@/pages-layer/profile';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <ProfilePage id={id} />;
}
