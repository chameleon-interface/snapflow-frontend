import Link from 'next/link';
import { Button, Typography } from 'snapflow-ui-kit';
import { ArrowBackIcon } from 'snapflow-ui-kit/icons';
import { getTranslations } from 'next-intl/server';
import s from './LegalPage.module.css';

type Props = {
  titleKey: string;
  sections: string[];
  backHref?: string;
};

export const LegalPage = async ({
  titleKey,
  sections,
  backHref = '/sign-up',
}: Props) => {
  const t = await getTranslations();

  return (
    <article className={s.page}>
      <header className={s.header}>
        <Button
          variant={'text'}
          as={Link}
          href={backHref}
          icon={<ArrowBackIcon />}
          className={s.backButton}
        >
          <span className={s.backButtonText}>{t('Nav.backToSignUp')}</span>
        </Button>
        <Typography variant={'h1'} as={'h1'} className={s.title}>
          {t(titleKey)}
        </Typography>
      </header>

      {sections.map((text, i) => (
        <Typography variant={'text-14'} as={'p'} key={i} className={s.text}>
          {text}
        </Typography>
      ))}
    </article>
  );
};
