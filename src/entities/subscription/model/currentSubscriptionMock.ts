export type CurrentSubscriptionMock = {
  expireAt: string;
  nextPayment: string;
  autoRenewal: boolean;
};

// TODO: replace with current subscription endpoint when payments API exposes it.
export const currentSubscriptionMock: CurrentSubscriptionMock = {
  expireAt: '2022-12-12T00:00:00.000Z',
  nextPayment: '2022-12-13T00:00:00.000Z',
  autoRenewal: true,
};
