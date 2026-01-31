import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('Pages');
  return <h1>{t('mainTitle')}</h1>;
}
