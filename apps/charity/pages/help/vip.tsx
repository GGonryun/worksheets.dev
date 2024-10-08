import { helpVip } from '@worksheets/ui/components/help';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { helpPageJson, HelpScreen } from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpVIPSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpVIPSeo} />
      <HelpScreen
        title={'VIP Membership'}
        description={
          'Want to accelerate your token earnings? Become a VIP member and earn more tokens for every game you play. Find out how to become a VIP member.'
        }
        qa={helpVip}
      />
      <FAQPageJsonLd mainEntity={helpPageJson(helpVip)} />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
