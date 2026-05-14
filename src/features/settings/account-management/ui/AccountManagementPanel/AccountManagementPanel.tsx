'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Typography } from 'snapflow-ui-kit';
import {
  useCreateCheckoutSessionMutation,
  useSubscriptionPlansQuery,
} from '@/entities/subscription';
import { getPaymentResult } from '../../lib/getPaymentResult';
import { AccountTypeSelector } from '../AccountTypeSelector/AccountTypeSelector';
import { CheckoutAgreementModal } from '../CheckoutAgreementModal/CheckoutAgreementModal';
import { PaymentActions } from '../PaymentActions/PaymentActions';
import { PaymentResultModal } from '../PaymentResultModal/PaymentResultModal';
import { SubscriptionPlansSelector } from '../SubscriptionPlansSelector/SubscriptionPlansSelector';

import s from './AccountManagementPanel.module.css';

type AccountType = 'personal' | 'business';

export const AccountManagementPanel = () => {
  const t = useTranslations('Settings.accountManagement');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [accountType, setAccountType] = useState<AccountType>('personal');
  const [selectedPlanIdDraft, setSelectedPlanIdDraft] = useState<string | null>(
    null,
  );
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const {
    data: plans = [],
    isError: isPlansError,
    isLoading: isPlansLoading,
    refetch: refetchPlans,
  } = useSubscriptionPlansQuery();
  const { mutate: createCheckoutSession, isPending: isCheckoutPending } =
    useCreateCheckoutSessionMutation();
  const paymentResult = getPaymentResult(
    searchParams.get('payment'),
    searchParams.get('session_id'),
  );

  const isBusinessAccount = accountType === 'business';
  const isSelectedPlanAvailable = plans.some(
    (plan) => plan.id === selectedPlanIdDraft,
  );
  const selectedPlanId =
    isBusinessAccount && plans.length > 0
      ? isSelectedPlanAvailable
        ? selectedPlanIdDraft
        : plans[0].id
      : null;
  const isPaymentDisabled =
    !isBusinessAccount ||
    !selectedPlanId ||
    isPlansLoading ||
    isPlansError ||
    isCheckoutPending;

  const handlePersonalSelect = () => {
    setAccountType('personal');
    setSelectedPlanIdDraft(null);
    setIsCheckoutModalOpen(false);
  };

  const handleBusinessSelect = () => {
    setAccountType('business');
  };

  const handlePayPalClick = () => {
    // TODO: replace placeholder with PayPal backend flow when API contract is available.
    alert(t('paypalUnavailable'));
  };

  const handleStripeClick = () => {
    if (isPaymentDisabled) {
      return;
    }

    setIsCheckoutModalOpen(true);
  };

  const handleCheckoutConfirm = () => {
    if (!selectedPlanId) {
      return;
    }

    createCheckoutSession(
      { planId: selectedPlanId },
      {
        onSuccess: (data) => {
          window.location.assign(data.url);
        },
      },
    );
  };

  const handlePaymentResultClose = () => {
    router.replace(`${pathname}?part=subscriptions`, { scroll: false });
  };

  return (
    <section className={s.root} aria-labelledby="account-management-title">
      <Typography
        id="account-management-title"
        as="h2"
        variant="text-16-bold"
        className={s.visuallyHidden}
      >
        {t('createPayment')}
      </Typography>

      <AccountTypeSelector
        accountType={accountType}
        onPersonalSelect={handlePersonalSelect}
        onBusinessSelect={handleBusinessSelect}
      />

      <div
        className={`${s.paymentPanel} ${isBusinessAccount ? s.paymentPanelOpen : ''}`}
        aria-hidden={!isBusinessAccount}
      >
        <div className={s.paymentPanelInner}>
          <div className={s.section}>
            <Typography
              as="h3"
              variant="text-14-bold"
              className={s.sectionTitle}
            >
              {t('subscriptionCosts')}
            </Typography>

            <SubscriptionPlansSelector
              plans={plans}
              selectedPlanId={selectedPlanId}
              isBusinessAccount={isBusinessAccount}
              isLoading={isPlansLoading}
              isError={isPlansError}
              onPlanSelect={setSelectedPlanIdDraft}
              onRetry={() => void refetchPlans()}
            />
          </div>

          <PaymentActions
            disabled={isPaymentDisabled}
            onPayPalClick={handlePayPalClick}
            onStripeClick={handleStripeClick}
          />
        </div>
      </div>

      <CheckoutAgreementModal
        isOpen={isCheckoutModalOpen}
        isLoading={isCheckoutPending}
        onClose={() => setIsCheckoutModalOpen(false)}
        onConfirm={handleCheckoutConfirm}
      />

      <PaymentResultModal
        paymentResult={paymentResult}
        onClose={handlePaymentResultClose}
      />
    </section>
  );
};
