import { helpIntegrations } from '@worksheets/ui/components/help';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { helpPageJson, HelpScreen } from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpIntegrationsSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpIntegrationsSeo} />
      <HelpScreen
        title={'Integrations'}
        description={
          'Learn how to connect your Charity.Games account to other services and apps. Get help with integrations, connections, and settings.'
        }
        qa={helpIntegrations}
      />
      <FAQPageJsonLd mainEntity={helpPageJson(helpIntegrations)} />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
