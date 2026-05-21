export const formatPaymentPrice = (priceInCents: number) => {
  return `$${(priceInCents / 100).toFixed(2)}`;
};
