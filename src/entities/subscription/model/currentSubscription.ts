import type { SubscriptionViewDto } from '@/shared/api/generated/model/payments';

export type CurrentSubscription = {
  planLabel: string;
  expireAt: string | null;
  nextPayment: string | null;
  autoRenewal: boolean;
  accountType: 'personal' | 'business';
};

const normalizeDate = (value: unknown) => {
  return typeof value === 'string' && value.length > 0 ? value : null;
};

const normalizeAutoRenewal = (value: unknown) => {
  return typeof value === 'boolean' ? value : false;
};

const normalizeAccountType = (value: unknown) => {
  return value === 'BUSINESS' ? 'business' : 'personal';
};

export const mapCurrentSubscription = (
  subscription: SubscriptionViewDto,
): CurrentSubscription => {
  const source = subscription as unknown as Record<string, unknown>;

  return {
    planLabel: String(subscription.subscriptionLabel),
    expireAt: normalizeDate(source.expireAt),
    nextPayment: normalizeDate(source.nextPayment),
    autoRenewal: normalizeAutoRenewal(source.autoRenewal),
    accountType: normalizeAccountType(source.accountType),
  };
};
