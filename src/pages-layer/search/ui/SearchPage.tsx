import { getTranslations } from 'next-intl/server';

export async function SearchPage() {
  const t = await getTranslations('Pages');

  return (
    <main>
      <h1>{t('searchTitle')}</h1>
      <p>{t('placeholder')}</p>
    </main>
  );
}
