import { LegalPage } from '@/shared/ui';
import { termsSections } from '../content';

export const TermsOfServicePage = () => (
  <LegalPage titleKey={'Pages.termsOfService'} sections={termsSections} />
);
