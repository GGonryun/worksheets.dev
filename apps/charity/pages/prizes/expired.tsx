import { LayoutContainer } from '@worksheets/ui/layout';
import { DynamicExpiredRafflesScreen } from '@worksheets/ui/pages/prizes';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { expiredRafflesSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...expiredRafflesSeo} />
    <DynamicExpiredRafflesScreen />
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
