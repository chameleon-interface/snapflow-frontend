import { useTranslations } from 'next-intl';
import { Button, Radio, Typography } from 'snapflow-ui-kit';
import type { PlanViewDto } from '@/shared/api/generated/model/payments';
import { getSubscriptionPlanLabelKey } from '@/shared/lib';
import { Skeleton } from '@/shared/ui/Skeleton';
import { formatPriceInCents } from '../../lib/formatPriceInCents';
import s from '../AccountManagementPanel/AccountManagementPanel.module.css';

type SubscriptionPlansSelectorProps = {
  plans: PlanViewDto[];
  selectedPlanId: string | null;
  isBusinessAccount: boolean;
  isLoading: boolean;
  isError: boolean;
  onPlanSelect: (planId: string) => void;
  onRetry: () => void;
};

export const SubscriptionPlansSelector = ({
  plans,
  selectedPlanId,
  isBusinessAccount,
  isLoading,
  isError,
  onPlanSelect,
  onRetry,
}: SubscriptionPlansSelectorProps) => {
  const t = useTranslations('Settings.accountManagement');
  const tSubscriptionPlans = useTranslations('SubscriptionPlans');

  if (isLoading) {
    return (
      <div className={s.plansSkeleton} aria-label={t('loadingPlans')}>
        <Skeleton height={24} width="45%" radius={4} />
        <Skeleton height={24} width="55%" radius={4} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={s.stateBox} role="alert">
        <Typography as="p" variant="text-14" className={s.stateText}>
          {t('plansLoadFailed')}
        </Typography>
        <Button
          type="button"
          variant="outlined"
          className={s.retryButton}
          onClick={onRetry}
        >
          {t('retry')}
        </Button>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <Typography as="p" variant="text-14" className={s.stateBox}>
        {t('noPlans')}
      </Typography>
    );
  }

  return (
    <div className={s.optionGroup}>
      {plans.map((plan) => {
        const planLabelKey = getSubscriptionPlanLabelKey(plan.label);

        return (
          <Radio
            key={plan.id}
            name="subscriptionPlan"
            value={plan.id}
            checked={selectedPlanId === plan.id}
            className={s.option}
            disabled={!isBusinessAccount}
            onChange={() => onPlanSelect(plan.id)}
          >
            <span className={s.planContent}>
              <span>{formatPriceInCents(plan.priceInCents)}</span>
              <span className={s.planLabel}>
                {planLabelKey ? tSubscriptionPlans(planLabelKey) : plan.label}
              </span>
            </span>
          </Radio>
        );
      })}
    </div>
  );
};
