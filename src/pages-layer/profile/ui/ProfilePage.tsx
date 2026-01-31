import { getTranslations } from 'next-intl/server';

export async function ProfilePage() {
  const t = await getTranslations('Pages');

  return (
    <main>
      <h1>{t('profileTitle')}</h1>
      <p>{t('placeholder')}</p>
    </main>
  );
}
