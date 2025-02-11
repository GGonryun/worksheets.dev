import { PrivacyPolicyScreen } from '@worksheets/ui/pages/privacy-policy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Read the Charity Games privacy policy. Learn about our data usage and privacy practices. Thank you for your support!`,
};

export default async function Page() {
  return <PrivacyPolicyScreen />;
}
