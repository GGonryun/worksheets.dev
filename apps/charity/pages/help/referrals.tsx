import { AppLayoutContainer } from '@worksheets/ui/layout';
import {
  helpPageJson,
  helpReferrals,
  HelpScreen,
} from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpReferralsSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpReferralsSeo} />
      <HelpScreen
        title={'Referrals'}
        description={
          'Referring friends to Charity Games is a great way to earn tokens and rewards. Find out how to refer friends and how to earn tokens for referring friends.'
        }
        qa={helpReferrals}
      />
      <FAQPageJsonLd mainEntity={helpPageJson(helpReferrals)} />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
