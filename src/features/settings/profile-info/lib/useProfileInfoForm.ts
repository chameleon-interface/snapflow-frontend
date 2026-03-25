import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import {
  SubmitHandler,
  useForm,
  UseFormReturn,
  useWatch,
} from 'react-hook-form';
import { useGetMyProfile, useMe, useUpdateProfile } from '@/entities/user';
import { DEFAULT_SETTINGS_FORM_VALUES } from '../model/settingsForm';
import { settingsSchema, type SettingsFormValues } from '../model/schema';
import { toastSuccess } from 'snapflow-ui-kit/client';
import { formatIso8601ToDdMmYyyy } from './dateOfBirthFormatters';
import { prepareProfileInfoPayload } from './prepareProfileInfoPayload';

type UseProfileInfoFormResult = {
  form: UseFormReturn<SettingsFormValues>;
  onSubmit: SubmitHandler<SettingsFormValues>;
  onDateOfBirthChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onCityChange: (value: string) => void;
  profileId: string;
  avatarUrl: string;
  dateOfBirth: string;
  country: string;
  city: string;
  isFormLoading: boolean;
  isSaveDisabled: boolean;
};

const setValueConfig = {
  shouldDirty: true,
  shouldTouch: true,
  shouldValidate: true,
} as const;

export const useProfileInfoForm = (): UseProfileInfoFormResult => {
  const t = useTranslations('Settings');
  const { data: me } = useMe();
  const profileId = me?.userId ?? '';
  const {
    data: profile,
    isPending: isProfilePending,
    isFetching: isProfileFetching,
  } = useGetMyProfile();
  const { mutate, isPending } = useUpdateProfile();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: DEFAULT_SETTINGS_FORM_VALUES,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const {
    control,
    getValues,
    register,
    reset,
    setValue,
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
      username: profile.username ?? '',
      firstName: profile.firstName ?? '',
      lastName: profile.lastName ?? '',
      dateOfBirth: formatIso8601ToDdMmYyyy(profile.dateOfBirth),
      country: profile.country ?? '',
      city: profile.city ?? '',
      aboutMe: profile.aboutMe ?? '',
    });
  }, [profile, reset]);

  const dateOfBirth = useWatch({ control, name: 'dateOfBirth' });
  const country = useWatch({ control, name: 'country' });
  const city = useWatch({ control, name: 'city' });

  const onDateOfBirthChange = (value: string) => {
    setValue('dateOfBirth', value, setValueConfig);
  };

  const onCountryChange = (value: string) => {
    const previousCountry = getValues('country');

    if (value === previousCountry) {
      return;
    }

    setValue('country', value, setValueConfig);
    setValue('city', '', setValueConfig);
  };

  const onCityChange = (value: string) => {
    setValue('city', value, setValueConfig);
  };

  const onSubmit: SubmitHandler<SettingsFormValues> = (data) => {
    mutate(prepareProfileInfoPayload(data), {
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
    onDateOfBirthChange,
    onCountryChange,
    onCityChange,
    profileId,
    avatarUrl: profile?.avatarUrl ?? '',
    dateOfBirth,
    country,
    city,
    isFormLoading,
    isSaveDisabled,
  };
};
