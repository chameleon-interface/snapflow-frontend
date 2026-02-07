import { Button, Typography } from 'snapflow-ui-kit';
import Link from 'next/link';
import Image from 'next/image';
import s from './ConfirmationSuccess.module.css';

export const ConfirmationSuccess = () => {
  return (
    <article className={s.wrapper}>
      <div className={s.textWrapper}>
        <Typography variant={'h1'} as={'h1'} className={s.title}>
          Congratulations!
        </Typography>
        <Typography variant={'text-16'}>
          Your email has been confirmed
        </Typography>
      </div>
      <Button as={Link} href={'/sign-in'} className={s.link}>
        Sign in
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
