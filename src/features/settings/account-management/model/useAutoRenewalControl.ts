import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useUpdateAutoRenewalMutation } from '@/entities/subscription';

type UseAutoRenewalControlParams = {
  initialAutoRenewal: boolean;
};

export const useAutoRenewalControl = ({
  initialAutoRenewal,
}: UseAutoRenewalControlParams) => {
  const t = useTranslations('Settings.accountManagement');
  const [autoRenewal, setAutoRenewal] = useState(initialAutoRenewal);
  const [autoRenewalError, setAutoRenewalError] = useState<string | null>(null);
  const { mutate: updateAutoRenewal, isPending: isAutoRenewalUpdating } =
    useUpdateAutoRenewalMutation();

  useEffect(() => {
    setAutoRenewal(initialAutoRenewal);
  }, [initialAutoRenewal]);

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
