import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicRafflesScreen } from '@worksheets/ui/pages/raffles';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { rafflesSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...rafflesSeo} />
    <DynamicRafflesScreen />
  </>
);

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
