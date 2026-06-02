export const formatPriceInCents = (priceInCents: number) => {
  return `$${(priceInCents / 100).toFixed(2)}`;
};
