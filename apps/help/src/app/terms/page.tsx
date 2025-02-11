import { TermsOfServiceScreen } from '@worksheets/ui/pages/terms-of-service';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Terms of Service`,
  description: `Read the Charity Games terms of service. Learn about our policies and guidelines. Thank you for your support!`,
};

export default async function Page() {
  return <TermsOfServiceScreen />;
}
