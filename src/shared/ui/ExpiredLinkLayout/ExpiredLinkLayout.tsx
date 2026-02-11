import { Typography } from 'snapflow-ui-kit';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import s from './ExpiredLinkLayout.module.css';
import { type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ExpiredLinkLayout = ({ children }: Props) => {
  const t = useTranslations();

  return (
    <article className={s.wrapper}>
      <div className={s.textWrapper}>
        <Typography variant={'h1'} as={'h1'} className={s.title}>
          {t('LinkExpired.title')}
        </Typography>
        <Typography variant={'text-16'}>
          {t('LinkExpired.description')}
        </Typography>
      </div>
      {children}
      <Image
        src={'/images/rafiki.svg'}
        alt={t('LinkExpired.imageAlt')}
        width={473}
        height={352}
        className={s.image}
      />
    </article>
  );
};
