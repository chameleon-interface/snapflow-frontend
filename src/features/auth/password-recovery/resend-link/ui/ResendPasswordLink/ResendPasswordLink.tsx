'use client';

import { Button } from 'snapflow-ui-kit';
import { useTranslations } from 'next-intl';
import s from './ResendPasswordLink.module.css';
import { useResendPasswordLink } from '../../api/useResendPasswordLink';

type Props = {
  email: string;
};

export const ResendPasswordLink = ({ email }: Props) => {
  const t = useTranslations();

  const { mutate, isPending } = useResendPasswordLink();

  const handleClick = () => {
    mutate(email);
  };

  return (
    <form className={s.form} onSubmit={(e) => e.preventDefault()}>
      <Button className={s.button} disabled={isPending} onClick={handleClick}>
        {t('LinkExpired.resendButton')}
      </Button>
    </form>
  );
};
