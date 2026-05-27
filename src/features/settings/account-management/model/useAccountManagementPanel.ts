'use client';

import { useState } from 'react';
import {
  useCurrentSubscriptionQuery,
  useSubscriptionPlansQuery,
} from '@/entities/subscription';
import type { AccountType } from './accountManagementTypes';
import { useAutoRenewalControl } from './useAutoRenewalControl';
import { useCheckoutFlow } from './useCheckoutFlow';
import { usePaymentResultModal } from './usePaymentResultModal';
import { useSelectedSubscriptionPlan } from './useSelectedSubscriptionPlan';

export const useAccountManagementPanel = () => {
  const [accountTypeDraft, setAccountTypeDraft] = useState<AccountType | null>(
    null,
  );
  const {
    data: plans = [],
    isError: isPlansError,
    isLoading: isPlansLoading,
    refetch: refetchPlans,
  } = useSubscriptionPlansQuery();
  const {
    data: currentSubscription,
    isError: isCurrentSubscriptionError,
    isLoading: isCurrentSubscriptionLoading,
    refetch: refetchCurrentSubscription,
  } = useCurrentSubscriptionQuery();
  const { paymentResult, handlePaymentResultClose } = usePaymentResultModal();
  const accountType =
    accountTypeDraft ?? currentSubscription?.accountType ?? 'personal';
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
  } = useAutoRenewalControl({
    initialAutoRenewal: currentSubscription?.autoRenewal ?? false,
  });
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
  const canShowAccountControls =
    !isCurrentSubscriptionLoading && !isCurrentSubscriptionError;

  const handlePersonalSelect = () => {
    setAccountTypeDraft('personal');
    resetSelectedPlan();
    handleCheckoutModalClose();
  };

  const handleBusinessSelect = () => {
    setAccountTypeDraft('business');
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
    currentSubscriptionProps: {
      currentSubscription,
      isLoading: isCurrentSubscriptionLoading,
      isError: isCurrentSubscriptionError,
      onRetry: () => void refetchCurrentSubscription(),
    },
    currentSubscriptionError: autoRenewalError,
    canShowAccountControls,
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
