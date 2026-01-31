import { getTranslations } from 'next-intl/server';

export async function StatisticsPage() {
  const t = await getTranslations('Pages');

  return (
    <main>
      <h1>{t('statisticsTitle')}</h1>
      <p>{t('placeholder')}</p>
    </main>
  );
}
