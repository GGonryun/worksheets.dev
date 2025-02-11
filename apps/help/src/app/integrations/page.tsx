import { helpIntegrations } from '@worksheets/ui/components/help';
import { FAQPageLdJson } from '@worksheets/ui/components/seo';
import { HelpScreen } from '@worksheets/ui/pages/help';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integrations',
  description:
    'Find answers to questions about integrations on Charity Games. Learn how to connect your account to other services.',
};

export default async function Page() {
  return (
    <>
      <HelpScreen
        title={'Integrations'}
        description={
          'Learn how to connect your Charity.Games account to other services and apps. Get help with integrations, connections, and settings.'
        }
        qa={helpIntegrations}
      />
      <FAQPageLdJson qa={helpIntegrations} />
    </>
  );
}
