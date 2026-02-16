import { Button, Typography } from 'snapflow-ui-kit';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import s from './ConfirmationSuccess.module.css';

export const ConfirmationSuccess = () => {
  const t = useTranslations();

  return (
    <article className={s.wrapper}>
      <div className={s.textWrapper}>
        <Typography variant={'h1'} as={'h1'} className={s.title}>
          {t('ConfirmationSuccess.title')}
        </Typography>
        <Typography variant={'text-16'}>
          {t('ConfirmationSuccess.description')}
        </Typography>
      </div>
      <Button as={Link} href={'/sign-in'} className={s.link} replace>
        {t('Auth.logIn')}
      </Button>
      <Image
        src={'/images/bro.svg'}
        alt={''}
        width={432}
        height={300}
        className={s.image}
      />
    </article>
  );
};
