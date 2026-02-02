import { getTranslations } from 'next-intl/server';

export async function FeedPage() {
  const t = await getTranslations('Pages');

  return (
    <main>
      <h1>{t('feedTitle')}</h1>
      <p>{t('placeholder')}</p>
    </main>
  );
}
