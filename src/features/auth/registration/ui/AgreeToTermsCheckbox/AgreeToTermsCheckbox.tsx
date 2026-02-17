'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, Typography } from 'snapflow-ui-kit';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import s from './AgreeToTermsCheckbox.module.css';
import { ROUTES } from '@/shared/config/routes';

export const AgreeToTermsCheckbox = () => {
  const { control, trigger } = useFormContext();
  const t = useTranslations('Forms.Registration');

  return (
    <Controller
      name={'agreeToTerms'}
      control={control}
      render={({ field }) => (
        <Checkbox
          name={field.name}
          checked={!!field.value}
          className={s.checkbox}
          onChange={(event) => {
            field.onChange(event.target.checked);
            trigger('agreeToTerms');
          }}
        >
          <Typography variant={'small'}>
            {t('agreeToTermsPrefix')}&nbsp;
            <Typography
              as={Link}
              href={ROUTES.SIGN_UP_TERMS_OF_SERVICE}
              variant={'small-link'}
            >
              {t('termsOfService')}
            </Typography>
            &nbsp;{t('and')}&nbsp;
            <Typography
              as={Link}
              href={ROUTES.SIGN_UP_PRIVACY_POLICY}
              variant={'small-link'}
            >
              {t('privacyPolicy')}
            </Typography>
          </Typography>
        </Checkbox>
      )}
    />
  );
};
