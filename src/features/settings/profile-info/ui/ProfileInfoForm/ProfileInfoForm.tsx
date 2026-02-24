'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { Button, Typography } from 'snapflow-ui-kit';
import { DatePicker, Input, Select, Textarea } from 'snapflow-ui-kit/client';
import { ImageIcon } from 'snapflow-ui-kit/icons';
import { useMediaQuery } from '@/shared/lib';
import {
  CITY_OPTIONS,
  COUNTRY_OPTIONS,
  DEFAULT_SETTINGS_FORM_VALUES,
  settingsSchema,
  SettingsFormValues,
} from '../../model';
import s from './ProfileInfoForm.module.css';

export const ProfileInfoForm = () => {
  const t = useTranslations('Settings');
  const tCommon = useTranslations();
  const isMobile = useMediaQuery(768);
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: DEFAULT_SETTINGS_FORM_VALUES,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    register('dateOfBirth');
    register('country');
    register('city');
  }, [register]);

  const dateOfBirth = useWatch({ control, name: 'dateOfBirth' });
  const country = useWatch({ control, name: 'country' });
  const city = useWatch({ control, name: 'city' });

  const onSubmit: SubmitHandler<SettingsFormValues> = () => {
    // Save integration will be added in the next iteration.
  };

  const getError = (errorMessage?: string) =>
    errorMessage ? tCommon(errorMessage) : undefined;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.infoLayout}>
      <div className={s.photoColumn}>
        <div className={s.avatarPlaceholder} aria-hidden>
          <ImageIcon />
        </div>

        <Button type="button" variant="outlined" className={s.photoButton}>
          <Typography
            variant={isMobile ? 'text-14-bold' : 'h3'}
            className={s.photoButtonLabel}
          >
            {t('selectProfilePhoto')}
          </Typography>
        </Button>
      </div>

      <div className={s.formColumn}>
        <Input
          label={t('fields.username')}
          required
          errorMessage={getError(errors.username?.message)}
          {...register('username')}
        />

        <Input
          label={t('fields.firstName')}
          required
          errorMessage={getError(errors.firstName?.message)}
          {...register('firstName')}
        />

        <Input
          label={t('fields.lastName')}
          required
          errorMessage={getError(errors.lastName?.message)}
          {...register('lastName')}
        />

        <DatePicker
          mode="single"
          label={t('fields.dateOfBirth')}
          error={getError(errors.dateOfBirth?.message)}
          value={dateOfBirth}
          onChange={(value) =>
            setValue('dateOfBirth', value, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })
          }
        />

        <div className={s.selectRow}>
          <Select
            label={t('fields.country')}
            placeholder={t('placeholders.country')}
            options={COUNTRY_OPTIONS}
            value={country || undefined}
            onChange={(value) =>
              setValue('country', value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              })
            }
          />

          <Select
            label={t('fields.city')}
            placeholder={t('placeholders.city')}
            options={CITY_OPTIONS}
            value={city || undefined}
            onChange={(value) =>
              setValue('city', value, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              })
            }
          />
        </div>

        <Textarea
          label={t('fields.about')}
          errorMessage={getError(errors.about?.message)}
          minHeight={120}
          placeholder={t('placeholders.about')}
          {...register('about')}
        />

        <div className={s.actions}>
          <Button type="submit" disabled={!isValid}>
            {t('saveChanges')}
          </Button>
        </div>
      </div>
    </form>
  );
};
