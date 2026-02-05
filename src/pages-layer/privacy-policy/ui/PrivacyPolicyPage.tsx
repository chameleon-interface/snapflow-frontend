import Link from 'next/link';
import { Button, Typography } from 'snapflow-ui-kit';
import { ArrowBackIcon } from 'snapflow-ui-kit/icons';
import { policySections } from '../content';
import s from './PrivacyPolicyPage.module.css';
import { getTranslations } from 'next-intl/server';

export const PrivacyPolicyPage = async () => {
  const t = await getTranslations();

  return (
    <>
      <Button
        variant={'text'}
        as={Link}
        href={'/sign-up'}
        icon={<ArrowBackIcon />}
        className={s.link}
      >
        {t('Nav.backToSignUp')}
      </Button>
      <article className={s.terms}>
        <Typography variant={'h1'} as={'h1'} className={s.title}>
          {t('Pages.privacyPolicy')}
        </Typography>
        {policySections.map((text, i) => (
          <Typography variant={'text-14'} as={'p'} key={i}>
            {text}
          </Typography>
        ))}
      </article>
    </>
  );
};
