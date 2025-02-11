import { AccountScreenContainer } from '@worksheets/ui/pages/account';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inventory',
  description: `Manage your Charity Games inventory. View your current items, prizes, and rewards.`,
};

export default function Page() {
  return <AccountScreenContainer />;
}
