import { CookiePolicyScreen } from '@worksheets/ui/pages/cookie-policy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookies Policy',
  description:
    'Read the Charity Games cookies policy. Learn about our cookie usage and privacy practices. Thank you for your support!',
};

export default async function Page() {
  return <CookiePolicyScreen />;
}
