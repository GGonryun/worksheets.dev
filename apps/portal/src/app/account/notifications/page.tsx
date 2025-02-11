import { AccountScreenContainer } from '@worksheets/ui/pages/account';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notifications',
  description: `Manage your Charity Games notifications. Stay up to date with the latest news and updates.`,
};

export default function Page() {
  return <AccountScreenContainer />;
}
