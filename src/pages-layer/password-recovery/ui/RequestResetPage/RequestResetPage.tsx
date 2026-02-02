'use client';

import {
  RequestResetFormData,
  requestResetSchema,
} from '@/features/auth/password-recovery/request-reset/model/schema';
import { FormTitle, InputDescription } from '@/shared/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Button, clsx, Typography } from 'snapflow-ui-kit';
import { Input } from 'snapflow-ui-kit/client';
import { FormContainer } from '../../../../shared/ui/form/FormContainer';
import s from './RequestResetPage.module.css';
import { useState } from 'react';

export const RequestResetPage = () => {
  const t = useTranslations('Validation');

  const [submitted, setSubmitted] = useState(false);

  const { control, handleSubmit } = useForm<RequestResetFormData>({
    resolver: zodResolver(requestResetSchema),
    defaultValues: {
      email: '',
      recaptchaToken: '',
    },
  });

  const email = useWatch({ control, name: 'email' });
  const recaptchaToken = useWatch({ control, name: 'recaptchaToken' });
  const isButtonDisabled = !email || !recaptchaToken;

  const onSubmit = async (data: RequestResetFormData) => {
    console.log(data);
    setSubmitted(true);
    // try {
    //   await fetch("/api/form-submit", { // TODO: change to the correct API
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       data,
    //     }),
    //   });
    // } catch (error) {
    //   console.error(error)
    // }
  };

  return (
    <FormContainer>
      <form className={'form'} onSubmit={handleSubmit(onSubmit)}>
        <FormTitle title="Forgot Password" className={s.title} />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              id="forgot-password-email"
              placeholder="Epam@epam.com"
              label="Email"
              errorMessage={fieldState.error?.message && t('email.invalid')}
            />
          )}
        />
        <InputDescription
          className={s.description}
          description="Enter your email address and we will send you further instructions"
        />
        <Controller
          name="recaptchaToken"
          control={control}
          render={({ field, fieldState }) => (
            <>
              {!submitted ? (
                <>
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                    onChange={(token) => {
                      field.onChange(token || '');
                    }}
                    theme="dark"
                    hl="en"
                  />
                  {fieldState.error?.message && (
                    <Typography className={s.errorMessage} variant="text-14">
                      {fieldState.error?.message}
                    </Typography>
                  )}
                </>
              ) : (
                <Typography className={s.successMessage} variant="text-14">
                  The link has been sent by email. <br />
                  If you don’t receive an email send link again.
                </Typography>
              )}
            </>
          )}
        />
        <Button
          className={clsx(s.button, 'formButton')}
          type="submit"
          disabled={!submitted && isButtonDisabled}
        >
          {submitted ? 'Send link again' : 'Send link'}
        </Button>
        <Button
          className={clsx(s.button, 'formButton')}
          variant="text"
          as={Link}
          href="/sign-in"
        >
          Back to sign in
        </Button>
      </form>
      {/* <Modal open={submitted} onClose={() => setSubmitted(false)} title="The link has been sent by email."></Modal> */}
    </FormContainer>
  );
};
