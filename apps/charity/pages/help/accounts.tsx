import { AppLayoutContainer } from '@worksheets/ui/layout';
import {
  helpAccounts,
  helpPageJson,
  HelpScreen,
} from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpAccountsSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpAccountsSeo} />
      <HelpScreen
        title={'Accounts & Profiles'}
        description={
          'Get help with your account, profile, and settings. Users can create an account to earn rewards, buy prizes, and earn badges and achievements.'
        }
        qa={helpAccounts}
      />
      <FAQPageJsonLd mainEntity={helpPageJson(helpAccounts)} />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
