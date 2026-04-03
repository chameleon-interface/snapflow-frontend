import { getTranslations } from 'next-intl/server';

import { StatisticsModalsPreview } from './StatisticsModalsPreview';

export async function StatisticsPage() {
  const t = await getTranslations('Pages');

  return (
    <main>
      <h1>{t('statisticsTitle')}</h1>
      <p>{t('placeholder')}</p>
      <StatisticsModalsPreview />
    </main>
  );
}
