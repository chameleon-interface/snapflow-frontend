import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCreateCheckoutSessionMutation } from '@/entities/subscription';

type UseCheckoutFlowParams = {
  isPaymentDisabled: boolean;
  selectedPlanId: string | null;
};

export const useCheckoutFlow = ({
  isPaymentDisabled,
  selectedPlanId,
}: UseCheckoutFlowParams) => {
  const t = useTranslations('Settings.accountManagement');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const { mutate: createCheckoutSession, isPending: isCheckoutPending } =
    useCreateCheckoutSessionMutation();

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
    if (isCheckoutPending || isPaymentDisabled || !selectedPlanId) {
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

  const handleCheckoutModalClose = () => {
    setIsCheckoutModalOpen(false);
  };

  return {
    isCheckoutModalOpen,
    isCheckoutPending,
    handleCheckoutModalClose,
    handleCheckoutConfirm,
    handlePayPalClick,
    handleStripeClick,
  };
};
