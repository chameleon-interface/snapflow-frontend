import { useLocale, useTranslations } from 'next-intl';
import { Checkbox, Typography } from 'snapflow-ui-kit';
import type { CurrentSubscription as CurrentSubscriptionData } from '@/entities/subscription';
import { formatCalendarDate, getSubscriptionPlanLabelKey } from '@/shared/lib';
import s from '../AccountManagementPanel/AccountManagementPanel.module.css';

type CurrentSubscriptionProps = {
  title: string;
  subscription: CurrentSubscriptionData;
  showAutoRenewal?: boolean;
  autoRenewal: boolean;
  isUpdating: boolean;
  errorMessage: string | null;
  onAutoRenewalChange: (autoRenewal: boolean) => void;
};

export const CurrentSubscription = ({
  title,
  subscription,
  showAutoRenewal = true,
  autoRenewal,
  isUpdating,
  errorMessage,
  onAutoRenewalChange,
}: CurrentSubscriptionProps) => {
  const t = useTranslations('Settings.accountManagement');
  const tSubscriptionPlans = useTranslations('SubscriptionPlans');
  const locale = useLocale();
  const planLabelKey = getSubscriptionPlanLabelKey(subscription.planLabel);

  return (
    <div className={s.section}>
      <Typography as="h3" variant="text-14-bold" className={s.sectionTitle}>
        {title}
      </Typography>

      <div className={s.currentSubscriptionBox}>
        <div className={s.subscriptionDateItem}>
          <Typography as="span" variant="text-14" className={s.dateLabel}>
            {t('subscription')}
          </Typography>
          <Typography as="span" variant="text-14" className={s.dateValue}>
            {planLabelKey
              ? tSubscriptionPlans(planLabelKey)
              : subscription.planLabel}
          </Typography>
        </div>

        <div className={s.subscriptionDateItem}>
          <Typography as="span" variant="text-14" className={s.dateLabel}>
            {t('expireAt')}
          </Typography>
          <Typography as="span" variant="text-14" className={s.dateValue}>
            {formatCalendarDate(subscription.expireAt, locale)}
          </Typography>
        </div>

        <div className={s.subscriptionDateItem}>
          <Typography as="span" variant="text-14" className={s.dateLabel}>
            {t('nextPayment')}
          </Typography>
          <Typography as="span" variant="text-14" className={s.dateValue}>
            {formatCalendarDate(subscription.nextPayment, locale)}
          </Typography>
        </div>
      </div>

      {subscription.status === 'PAST_DUE' && (
        <Typography as="p" variant="text-14" className={s.errorText}>
          {t('pastDueSubscription')}
        </Typography>
      )}

      {showAutoRenewal && (
        <Checkbox
          checked={autoRenewal}
          disabled={isUpdating}
          className={s.autoRenewal}
          onChange={(event) => onAutoRenewalChange(event.target.checked)}
        >
          {t('autoRenewal')}
        </Checkbox>
      )}

      {errorMessage && (
        <Typography as="p" variant="text-14" className={s.errorText}>
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};
