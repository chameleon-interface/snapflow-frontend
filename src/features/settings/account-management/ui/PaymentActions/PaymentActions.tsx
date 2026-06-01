import { useTranslations } from 'next-intl';
import { Button } from 'snapflow-ui-kit';
import { PayPalLogo, StripeLogo } from 'snapflow-ui-kit/icons';
import s from '../AccountManagementPanel/AccountManagementPanel.module.css';

type PaymentActionsProps = {
  disabled: boolean;
  onPayPalClick: () => void;
  onStripeClick: () => void;
};

export const PaymentActions = ({
  disabled,
  onPayPalClick,
  onStripeClick,
}: PaymentActionsProps) => {
  const t = useTranslations('Settings.accountManagement');

  return (
    <div className={s.actions} aria-label={t('paymentActions')}>
      <Button
        type="button"
        variant="outlined"
        className={s.paymentButton}
        disabled={disabled}
        onClick={onPayPalClick}
      >
        <PayPalLogo
          className={`${s.paymentLogo} ${s.paypalLogo}`}
          aria-hidden="true"
        />
        <span className={s.paymentLabel}>{t('paypal')}</span>
      </Button>

      <Button
        type="button"
        variant="outlined"
        className={s.paymentButton}
        disabled={disabled}
        onClick={onStripeClick}
      >
        <StripeLogo
          className={`${s.paymentLogo} ${s.stripeLogo}`}
          aria-hidden="true"
        />
        <span className={s.paymentLabel}>{t('stripe')}</span>
      </Button>
    </div>
  );
};
