'use client';

import { useTranslations } from 'next-intl';
import { Typography } from 'snapflow-ui-kit';
import {
  currentSubscriptionMock,
  futureSubscriptionMock,
} from '@/entities/subscription';
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
    currentSubscriptionError,
    paymentResultModalProps,
    subscriptionControlProps,
  } = useAccountManagementPanel();
  const hasFutureSubscriptionMock =
    paymentResultModalProps.paymentResult === 'success';

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

      <CurrentSubscription
        title={t('currentSubscription')}
        subscription={currentSubscriptionMock}
        showAutoRenewal={!hasFutureSubscriptionMock}
        errorMessage={
          hasFutureSubscriptionMock ? null : currentSubscriptionError
        }
        {...subscriptionControlProps}
      />

      {hasFutureSubscriptionMock && (
        <CurrentSubscription
          title={t('nextSubscription')}
          subscription={futureSubscriptionMock}
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
