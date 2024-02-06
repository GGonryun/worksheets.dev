import { LayoutContainer } from '@worksheets/ui/layout';
import { DynamicPrizeWallScreen } from '@worksheets/ui/pages/prizes';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { prizesSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...prizesSeo} />
    <DynamicPrizeWallScreen />
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
