export type SubscriptionPlanLabelKey = 'businessMonthly' | 'businessYearly';

export const getSubscriptionPlanLabelKey = (
  label: string,
): SubscriptionPlanLabelKey | null => {
  switch (label) {
    case 'Business Monthly':
      return 'businessMonthly';
    case 'Business Yearly':
      return 'businessYearly';
    default:
      return null;
  }
};
