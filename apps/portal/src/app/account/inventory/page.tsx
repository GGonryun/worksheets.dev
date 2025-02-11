import { AccountScreenContainer } from '@worksheets/ui/pages/account';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integrations',
  description: `Manage your Charity Games integrations. Connect your account to other services.`,
};

export default function Page() {
  return <AccountScreenContainer />;
}
