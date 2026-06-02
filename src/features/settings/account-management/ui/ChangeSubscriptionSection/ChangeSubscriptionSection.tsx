import { useTranslations } from 'next-intl';
import { Typography } from 'snapflow-ui-kit';
import type { PlanViewDto } from '@/shared/api/generated/model/payments';
import { PaymentActions } from '../PaymentActions/PaymentActions';
import { SubscriptionPlansSelector } from '../SubscriptionPlansSelector/SubscriptionPlansSelector';
import s from '../AccountManagementPanel/AccountManagementPanel.module.css';

type ChangeSubscriptionSectionProps = {
  plans: PlanViewDto[];
  selectedPlanId: string | null;
  isBusinessAccount: boolean;
  isLoading: boolean;
  isError: boolean;
  isPaymentDisabled: boolean;
  onPlanSelect: (planId: string) => void;
  onRetry: () => void;
  onPayPalClick: () => void;
  onStripeClick: () => void;
};

export const ChangeSubscriptionSection = ({
  plans,
  selectedPlanId,
  isBusinessAccount,
  isLoading,
  isError,
  isPaymentDisabled,
  onPlanSelect,
  onRetry,
  onPayPalClick,
  onStripeClick,
}: ChangeSubscriptionSectionProps) => {
  const t = useTranslations('Settings.accountManagement');

  return (
    <div className={s.paymentPanelInner}>
      <div className={s.section}>
        <Typography as="h3" variant="text-14-bold" className={s.sectionTitle}>
          {t('changeSubscription')}
        </Typography>

        <SubscriptionPlansSelector
          plans={plans}
          selectedPlanId={selectedPlanId}
          isBusinessAccount={isBusinessAccount}
          isLoading={isLoading}
          isError={isError}
          onPlanSelect={onPlanSelect}
          onRetry={onRetry}
        />
      </div>

      <PaymentActions
        disabled={isPaymentDisabled}
        onPayPalClick={onPayPalClick}
        onStripeClick={onStripeClick}
      />
    </div>
  );
};
