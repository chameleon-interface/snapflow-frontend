import { getTranslations } from 'next-intl/server';

export async function SignUpPage() {
  const t = await getTranslations('Pages');

  return (
    <main>
      <h1>{t('signUpTitle')}</h1>
      <p>{t('placeholder')}</p>
    </main>
  );
}
