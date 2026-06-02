import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toastError } from 'snapflow-ui-kit/client';
import { useCreateCheckoutSessionMutation } from '@/entities/subscription';

const STRIPE_CHECKOUT_HOST = 'checkout.stripe.com';

type UseCheckoutFlowParams = {
  isPaymentDisabled: boolean;
  selectedPlanId: string | null;
};

const getStripeCheckoutUrl = (value: string) => {
  try {
    const url = new URL(value);

    return url.hostname === STRIPE_CHECKOUT_HOST ? url.toString() : null;
  } catch {
    return null;
  }
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
          const checkoutUrl = getStripeCheckoutUrl(data.url);

          if (!checkoutUrl) {
            toastError(t('paymentErrorMessage'));
            return;
          }

          window.location.assign(checkoutUrl);
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
