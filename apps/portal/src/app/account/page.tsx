import { AccountScreenContainer } from '@worksheets/ui/pages/account';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account',
  description: `Manage your Charity Games account. View your profile and manage your settings.`,
};

export default function Page() {
  return <AccountScreenContainer />;
}
