'use client';

import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit';
import { DatePicker, Input, Select, Textarea } from 'snapflow-ui-kit/client';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { useProfileInfoForm } from '../../model/useProfileInfoForm';
import { ProfileAvatarSection } from '../ProfileAvatarSection/ProfileAvatarSection';
import { useProfileLocationFields } from './useProfileLocationFields';
import s from './ProfileInfoForm.module.css';

export const ProfileInfoForm = () => {
  const t = useTranslations('Settings');
  const tCommon = useTranslations();
  const isMobile = useMediaQuery(768);
  const {
    form: {
      handleSubmit,
      register,
      formState: { errors },
    },
    onSubmit,
    onDateOfBirthChange,
    onCountryChange,
    onCityChange,
    dateOfBirth,
    country,
    city,
    isFormLoading,
    isSaveDisabled,
  } = useProfileInfoForm();
  const {
    cityOptions,
    countryOptions,
    cityDisabled,
    isCitiesFetching,
    setCitySearchQuery,
    handleCountryChange,
    handleCityChange,
  } = useProfileLocationFields({
    country,
    city,
    isFormLoading,
    onCountryChange,
    onCityChange,
  });

  const getError = (errorMessage?: string) =>
    errorMessage ? tCommon(errorMessage) : undefined;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset
        disabled={isFormLoading}
        className={`${s.infoLayout} ${s.formFieldset}`}
      >
        <ProfileAvatarSection
          isMobile={isMobile}
          label={t('selectProfilePhoto')}
        />

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
            onChange={onDateOfBirthChange}
          />

          <div className={s.selectRow}>
            <Select
              label={t('fields.country')}
              placeholder={t('placeholders.country')}
              options={countryOptions}
              searchable
              value={country || undefined}
              onChange={handleCountryChange}
            />

            <Select
              label={t('fields.city')}
              placeholder={t('placeholders.city')}
              options={cityOptions}
              searchable
              searchMode="remote"
              filterOptions={false}
              onSearchChange={setCitySearchQuery}
              searchDebounceMs={300}
              isLoading={isCitiesFetching}
              disabled={cityDisabled}
              value={city || undefined}
              onChange={handleCityChange}
            />
          </div>

          <Textarea
            label={t('fields.about')}
            errorMessage={getError(errors.aboutMe?.message)}
            minHeight={120}
            placeholder={t('placeholders.about')}
            {...register('aboutMe')}
          />

          <div className={s.actions}>
            <Button type="submit" disabled={isSaveDisabled}>
              {t('saveChanges')}
            </Button>
          </div>
        </div>
      </fieldset>
    </form>
  );
};
