import { getTranslations } from 'next-intl/server';

export async function MessengerPage() {
  const t = await getTranslations('Pages');

  return (
    <main>
      <h1>{t('messengerTitle')}</h1>
      <p>{t('placeholder')}</p>
    </main>
  );
}
