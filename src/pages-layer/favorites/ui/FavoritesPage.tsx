import { getTranslations } from 'next-intl/server';

export async function FavoritesPage() {
  const t = await getTranslations('Pages');

  return (
    <main>
      <h1>{t('favoritesTitle')}</h1>
      <p>{t('placeholder')}</p>
    </main>
  );
}
