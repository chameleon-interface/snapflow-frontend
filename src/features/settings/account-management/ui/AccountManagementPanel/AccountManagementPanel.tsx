'use client';

import { useTranslations } from 'next-intl';
import { Button, Typography } from 'snapflow-ui-kit';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useAccountManagementPanel } from '../../model/useAccountManagementPanel';
import { AccountTypeSelector } from '../AccountTypeSelector/AccountTypeSelector';
import { ChangeSubscriptionSection } from '../ChangeSubscriptionSection/ChangeSubscriptionSection';
import { CheckoutAgreementModal } from '../CheckoutAgreementModal/CheckoutAgreementModal';
import { CurrentSubscription } from '../CurrentSubscription/CurrentSubscription';
import { PaymentResultModal } from '../PaymentResultModal/PaymentResultModal';

import s from './AccountManagementPanel.module.css';

export const AccountManagementPanel = () => {
  const t = useTranslations('Settings.accountManagement');
  const {
    accountTypeSelectorProps,
    changeSubscriptionProps,
    checkoutModalProps,
    currentSubscriptionProps,
    currentSubscriptionError,
    paymentResultModalProps,
    subscriptionControlProps,
  } = useAccountManagementPanel();

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

      {currentSubscriptionProps.isLoading && (
        <div className={s.section} aria-label={t('loadingCurrentSubscription')}>
          <Skeleton height={20} width={160} radius={4} />
          <div className={s.currentSubscriptionBox}>
            <Skeleton height={44} width="28%" radius={4} />
            <Skeleton height={44} width="24%" radius={4} />
            <Skeleton height={44} width="24%" radius={4} />
          </div>
        </div>
      )}

      {!currentSubscriptionProps.isLoading &&
        currentSubscriptionProps.isError && (
          <div className={s.stateBox} role="alert">
            <Typography as="p" variant="text-14" className={s.stateText}>
              {t('currentSubscriptionLoadFailed')}
            </Typography>
            <Button
              type="button"
              variant="outlined"
              className={s.retryButton}
              onClick={currentSubscriptionProps.onRetry}
            >
              {t('retry')}
            </Button>
          </div>
        )}

      {!currentSubscriptionProps.isLoading &&
        !currentSubscriptionProps.isError &&
        !currentSubscriptionProps.currentSubscription && (
          <Typography as="p" variant="text-14" className={s.stateBox}>
            {t('noCurrentSubscription')}
          </Typography>
        )}

      {currentSubscriptionProps.currentSubscription && (
        <CurrentSubscription
          title={t('currentSubscription')}
          subscription={currentSubscriptionProps.currentSubscription}
          errorMessage={currentSubscriptionError}
          {...subscriptionControlProps}
        />
      )}

      <AccountTypeSelector {...accountTypeSelectorProps} />

      <div
        className={`${s.paymentPanel} ${changeSubscriptionProps.isBusinessAccount ? s.paymentPanelOpen : ''}`}
        aria-hidden={!changeSubscriptionProps.isBusinessAccount}
      >
        <ChangeSubscriptionSection {...changeSubscriptionProps} />
      </div>

      <CheckoutAgreementModal {...checkoutModalProps} />

      <PaymentResultModal {...paymentResultModalProps} />
    </section>
  );
};
