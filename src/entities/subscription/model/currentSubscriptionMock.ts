export type CurrentSubscriptionMock = {
  planLabel: string;
  expireAt: string;
  nextPayment: string;
  autoRenewal: boolean;
};

// TODO: replace with current subscription endpoint when payments API exposes it.
export const currentSubscriptionMock: CurrentSubscriptionMock = {
  planLabel: 'Business Monthly',
  expireAt: '2022-12-12T00:00:00.000Z',
  nextPayment: '2022-12-13T00:00:00.000Z',
  autoRenewal: true,
};

// TODO: replace with backend current/future subscription state after checkout status endpoint is available.
export const futureSubscriptionMock: CurrentSubscriptionMock = {
  planLabel: 'Business Yearly',
  expireAt: '2023-12-12T00:00:00.000Z',
  nextPayment: '2023-12-13T00:00:00.000Z',
  autoRenewal: true,
};
