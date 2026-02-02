import { getTranslations } from 'next-intl/server';

export async function SignInPage() {
  const t = await getTranslations('Pages');

  return (
    <main>
      <h1>{t('signInTitle')}</h1>
      <p>{t('placeholder')}</p>
    </main>
  );
}
