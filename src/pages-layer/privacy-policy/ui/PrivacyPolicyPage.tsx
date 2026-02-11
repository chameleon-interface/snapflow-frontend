import { LegalPage } from '@/shared/ui';
import { policySections } from '../content';

export const PrivacyPolicyPage = () => (
  <LegalPage titleKey={'Pages.privacyPolicy'} sections={policySections} />
);
