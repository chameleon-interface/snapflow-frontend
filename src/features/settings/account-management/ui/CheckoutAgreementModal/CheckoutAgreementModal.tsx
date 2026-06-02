import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Checkbox, Typography } from 'snapflow-ui-kit';
import { Modal } from 'snapflow-ui-kit/client';
import s from './CheckoutAgreementModal.module.css';

type CheckoutAgreementModalProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const CheckoutAgreementModal = ({
  isOpen,
  isLoading = false,
  onClose,
  onConfirm,
}: CheckoutAgreementModalProps) => {
  const t = useTranslations('Settings.accountManagement');
  const [isAgreed, setIsAgreed] = useState(false);

  const handleClose = () => {
    setIsAgreed(false);
    onClose();
  };

  const handleConfirm = () => {
    if (!isAgreed || isLoading) {
      return;
    }

    onConfirm();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      open={true}
      onClose={handleClose}
      title={t('createPayment')}
      className={s.modal}
    >
      <div className={s.body}>
        <Typography as="p" variant="text-14" className={s.message}>
          {t('agreement')}
        </Typography>

        <Checkbox
          checked={isAgreed}
          disabled={isLoading}
          className={s.checkbox}
          onChange={(event) => setIsAgreed(event.target.checked)}
        >
          {t('agree')}
        </Checkbox>
      </div>

      <div className={s.footer}>
        <Button
          type="button"
          variant="outlined"
          className={s.button}
          disabled={isLoading}
          onClick={handleClose}
        >
          {t('cancel')}
        </Button>

        <Button
          type="button"
          className={s.button}
          disabled={!isAgreed || isLoading}
          onClick={handleConfirm}
        >
          {t('ok')}
        </Button>
      </div>
    </Modal>
  );
};
