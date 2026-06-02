import type { SubscriptionViewDto } from '@/shared/api/generated/model/payments';

export type CurrentSubscription = {
  planLabel: string;
  expireAt: string | null;
  nextPayment: string | null;
  autoRenewal: boolean;
  accountType: 'personal' | 'business';
  status: 'ACTIVE' | 'CANCELLED' | 'PAST_DUE' | 'PENDING' | null;
};

const normalizeAccountType = (value: unknown) => {
  return value === 'BUSINESS' ? 'business' : 'personal';
};

const normalizeStatus = (value: unknown) => {
  return value === 'ACTIVE' ||
    value === 'CANCELLED' ||
    value === 'PAST_DUE' ||
    value === 'PENDING'
    ? value
    : null;
};

const normalizeLabel = (value: unknown) => {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
};

export const mapCurrentSubscription = (
  subscription: SubscriptionViewDto,
): CurrentSubscription => {
  const planLabel =
    normalizeLabel(subscription.subscriptionLabel) ??
    normalizeLabel(subscription.subscriptionType) ??
    '-';

  return {
    planLabel,
    expireAt: subscription.expireAt,
    nextPayment: subscription.nextPayment,
    autoRenewal: subscription.autoRenewal,
    accountType: normalizeAccountType(subscription.accountType),
    status: normalizeStatus(subscription.status),
  };
};
