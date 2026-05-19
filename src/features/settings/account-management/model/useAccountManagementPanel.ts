'use client';

import { useState } from 'react';
import { useSubscriptionPlansQuery } from '@/entities/subscription';
import type { AccountType } from './accountManagementTypes';
import { useAutoRenewalControl } from './useAutoRenewalControl';
import { useCheckoutFlow } from './useCheckoutFlow';
import { usePaymentResultModal } from './usePaymentResultModal';
import { useSelectedSubscriptionPlan } from './useSelectedSubscriptionPlan';

export const useAccountManagementPanel = () => {
  const [accountType, setAccountType] = useState<AccountType>('business');
  const {
    data: plans = [],
    isError: isPlansError,
    isLoading: isPlansLoading,
    refetch: refetchPlans,
  } = useSubscriptionPlansQuery();
  const isBusinessAccount = accountType === 'business';
  const { selectedPlanId, handlePlanSelect, resetSelectedPlan } =
    useSelectedSubscriptionPlan({
      plans,
      isBusinessAccount,
    });
  const {
    autoRenewal,
    autoRenewalError,
    isAutoRenewalUpdating,
    handleAutoRenewalChange,
  } = useAutoRenewalControl();
  const { paymentResult, handlePaymentResultClose } = usePaymentResultModal();

  const isPaymentDisabled =
    !isBusinessAccount || !selectedPlanId || isPlansLoading || isPlansError;
  const {
    isCheckoutModalOpen,
    isCheckoutPending,
    handleCheckoutModalClose,
    handleCheckoutConfirm,
    handlePayPalClick,
    handleStripeClick,
  } = useCheckoutFlow({
    isPaymentDisabled,
    selectedPlanId,
  });
  const isPaymentActionDisabled = isPaymentDisabled || isCheckoutPending;

  const handlePersonalSelect = () => {
    setAccountType('personal');
    resetSelectedPlan();
    handleCheckoutModalClose();
  };

  const handleBusinessSelect = () => {
    setAccountType('business');
  };

  return {
    accountTypeSelectorProps: {
      accountType,
      onPersonalSelect: handlePersonalSelect,
      onBusinessSelect: handleBusinessSelect,
    },
    subscriptionControlProps: {
      autoRenewal,
      isUpdating: isAutoRenewalUpdating,
      onAutoRenewalChange: handleAutoRenewalChange,
    },
    currentSubscriptionError: autoRenewalError,
    changeSubscriptionProps: {
      plans,
      selectedPlanId,
      isBusinessAccount,
      isLoading: isPlansLoading,
      isError: isPlansError,
      isPaymentDisabled: isPaymentActionDisabled,
      onPlanSelect: handlePlanSelect,
      onRetry: () => void refetchPlans(),
      onPayPalClick: handlePayPalClick,
      onStripeClick: handleStripeClick,
    },
    checkoutModalProps: {
      isOpen: isCheckoutModalOpen,
      isLoading: isCheckoutPending,
      onClose: handleCheckoutModalClose,
      onConfirm: handleCheckoutConfirm,
    },
    paymentResultModalProps: {
      paymentResult,
      onClose: handlePaymentResultClose,
    },
  };
};
