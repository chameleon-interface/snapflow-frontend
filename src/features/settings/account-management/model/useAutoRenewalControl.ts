import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  currentSubscriptionMock,
  useUpdateAutoRenewalMutation,
} from '@/entities/subscription';

export const useAutoRenewalControl = () => {
  const t = useTranslations('Settings.accountManagement');
  const [autoRenewal, setAutoRenewal] = useState(
    currentSubscriptionMock.autoRenewal,
  );
  const [autoRenewalError, setAutoRenewalError] = useState<string | null>(null);
  const { mutate: updateAutoRenewal, isPending: isAutoRenewalUpdating } =
    useUpdateAutoRenewalMutation();

  const handleAutoRenewalChange = (nextAutoRenewal: boolean) => {
    const previousAutoRenewal = autoRenewal;

    setAutoRenewal(nextAutoRenewal);
    setAutoRenewalError(null);

    updateAutoRenewal(
      { autoRenewal: nextAutoRenewal },
      {
        onError: () => {
          setAutoRenewal(previousAutoRenewal);
          setAutoRenewalError(t('autoRenewalUpdateFailed'));
        },
      },
    );
  };

  return {
    autoRenewal,
    autoRenewalError,
    isAutoRenewalUpdating,
    handleAutoRenewalChange,
  };
};
