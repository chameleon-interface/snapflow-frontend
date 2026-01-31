import { getTranslations } from 'next-intl/server';

export async function SettingsPage() {
  const t = await getTranslations('Pages');

  return (
    <main>
      <h1>{t('settingsTitle')}</h1>
      <p>{t('placeholder')}</p>
    </main>
  );
}
