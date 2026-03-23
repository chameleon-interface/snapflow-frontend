import { getTranslations } from 'next-intl/server';
import { FeedPageClient } from './FeedPageClient';

export async function FeedPage() {
  const t = await getTranslations('Pages');

  return (
    <main>
      <h1>{t('feedTitle')}</h1>
      <FeedPageClient />
    </main>
  );
}
