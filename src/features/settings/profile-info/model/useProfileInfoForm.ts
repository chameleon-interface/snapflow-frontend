import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import {
  SubmitHandler,
  useForm,
  UseFormReturn,
  useWatch,
} from 'react-hook-form';
import { useGetProfileById, useMe, useUpdateProfile } from '@/entities/user';
import { DEFAULT_SETTINGS_FORM_VALUES } from './settingsForm';
import { settingsSchema, type SettingsFormValues } from './schema';
import { toastSuccess } from 'snapflow-ui-kit/client';

type UseProfileInfoFormResult = {
  form: UseFormReturn<SettingsFormValues>;
  onSubmit: SubmitHandler<SettingsFormValues>;
  dateOfBirth: string;
  country: string;
  city: string;
  isFormLoading: boolean;
  isSaveDisabled: boolean;
};

export const useProfileInfoForm = (): UseProfileInfoFormResult => {
  const t = useTranslations('Settings');
  const { data: me } = useMe();
  const profileId = Number(me!.userId);
  const {
    data: profile,
    isPending: isProfilePending,
    isFetching: isProfileFetching,
  } = useGetProfileById(profileId);
  const { mutate, isPending } = useUpdateProfile(profileId);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: DEFAULT_SETTINGS_FORM_VALUES,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    control,
    register,
    reset,
    formState: { isDirty, isValid },
  } = form;

  useEffect(() => {
    register('dateOfBirth');
    register('country');
    register('city');
  }, [register]);

  useEffect(() => {
    if (!profile) {
      return;
    }

    reset({
      username: profile.username,
      firstName: profile.firstName,
      lastName: profile.lastName,
      dateOfBirth: profile.dateOfBirth,
      country: profile.country,
      city: profile.city,
      about: profile.about,
    });
  }, [profile, reset]);

  const dateOfBirth = useWatch({ control, name: 'dateOfBirth' });
  const country = useWatch({ control, name: 'country' });
  const city = useWatch({ control, name: 'city' });

  const onSubmit: SubmitHandler<SettingsFormValues> = (data) => {
    mutate(data, {
      onSuccess: () => {
        toastSuccess(t('settingsSaved'));
      },
    });
  };

  const isFormLoading = isProfilePending || isProfileFetching || isPending;
  const isSaveDisabled = !isValid || !isDirty || isFormLoading;

  return {
    form,
    onSubmit,
    dateOfBirth,
    country,
    city,
    isFormLoading,
    isSaveDisabled,
  };
};
