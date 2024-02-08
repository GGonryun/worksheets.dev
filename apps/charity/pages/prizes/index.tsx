import { LayoutContainer } from '@worksheets/ui/layout';
import { DynamicPrizesScreen } from '@worksheets/ui/pages/prizes';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { prizesSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...prizesSeo} />
    <DynamicPrizesScreen />
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
