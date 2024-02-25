import { MarketingLayoutContainer } from '@worksheets/ui/layout';
import { DynamicMarketingScreen } from '@worksheets/ui/pages/marketing';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { homeSeo } from '../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...homeSeo} />
      <DynamicMarketingScreen />
    </>
  );
};

Page.getLayout = (page) => {
  return <MarketingLayoutContainer>{page}</MarketingLayoutContainer>;
};

export default Page;
