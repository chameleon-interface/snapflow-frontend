import { useState } from 'react';
import type { PlanViewDto } from '@/shared/api/generated/model/payments';

type UseSelectedSubscriptionPlanParams = {
  plans: PlanViewDto[];
  isBusinessAccount: boolean;
};

export const useSelectedSubscriptionPlan = ({
  plans,
  isBusinessAccount,
}: UseSelectedSubscriptionPlanParams) => {
  const [selectedPlanIdDraft, setSelectedPlanIdDraft] = useState<string | null>(
    null,
  );
  const isSelectedPlanAvailable = plans.some(
    (plan) => plan.id === selectedPlanIdDraft,
  );
  const selectedPlanId =
    isBusinessAccount && plans.length > 0
      ? isSelectedPlanAvailable
        ? selectedPlanIdDraft
        : plans[0].id
      : null;

  const resetSelectedPlan = () => {
    setSelectedPlanIdDraft(null);
  };

  return {
    selectedPlanId,
    handlePlanSelect: setSelectedPlanIdDraft,
    resetSelectedPlan,
  };
};
