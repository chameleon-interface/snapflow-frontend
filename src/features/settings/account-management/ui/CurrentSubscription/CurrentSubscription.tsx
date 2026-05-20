import { useTranslations } from 'next-intl';
import { Checkbox, Typography } from 'snapflow-ui-kit';
import type { CurrentSubscription as CurrentSubscriptionData } from '@/entities/subscription';
import { formatSubscriptionDate } from '../../lib/formatSubscriptionDate';
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
            {subscription.planLabel}
          </Typography>
        </div>

        <div className={s.subscriptionDateItem}>
          <Typography as="span" variant="text-14" className={s.dateLabel}>
            {t('expireAt')}
          </Typography>
          <Typography as="span" variant="text-14" className={s.dateValue}>
            {formatSubscriptionDate(subscription.expireAt)}
          </Typography>
        </div>

        <div className={s.subscriptionDateItem}>
          <Typography as="span" variant="text-14" className={s.dateLabel}>
            {t('nextPayment')}
          </Typography>
          <Typography as="span" variant="text-14" className={s.dateValue}>
            {formatSubscriptionDate(subscription.nextPayment)}
          </Typography>
        </div>
      </div>

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
