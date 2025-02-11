import { helpAccounts } from '@worksheets/ui/components/help';
import { FAQPageLdJson } from '@worksheets/ui/components/seo';
import { HelpScreen } from '@worksheets/ui/pages/help';
import { Boundary } from '@worksheets/ui/suspense/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account',
  description:
    'Find answers to questions about accounts, profiles, and settings on Charity Games.',
};

export default async function Page() {
  return (
    <Boundary>
      <HelpScreen
        title={'Accounts & Profiles'}
        description={
          'Get help with your account, profile, and settings. Users can create an account to earn rewards, buy prizes, and earn badges and achievements.'
        }
        qa={helpAccounts}
      />
      <FAQPageLdJson qa={helpAccounts} />
    </Boundary>
  );
}
