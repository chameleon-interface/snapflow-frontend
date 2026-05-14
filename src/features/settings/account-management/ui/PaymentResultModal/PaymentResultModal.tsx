import { useTranslations } from 'next-intl';
import { InfoModal } from '@/shared/ui/modals/InfoModal';
import type { PaymentResult } from '../../lib/getPaymentResult';

type PaymentResultModalProps = {
  paymentResult: PaymentResult;
  onClose: () => void;
};

export const PaymentResultModal = ({
  paymentResult,
  onClose,
}: PaymentResultModalProps) => {
  const t = useTranslations('Settings.accountManagement');
  const isPaymentResultSuccess = paymentResult === 'success';

  return (
    <InfoModal
      open={paymentResult !== null}
      onClose={onClose}
      title={
        isPaymentResultSuccess
          ? t('paymentSuccessTitle')
          : t('paymentErrorTitle')
      }
      message={
        isPaymentResultSuccess
          ? t('paymentSuccessMessage')
          : t('paymentErrorMessage')
      }
      buttonText={t('ok')}
    />
  );
};
