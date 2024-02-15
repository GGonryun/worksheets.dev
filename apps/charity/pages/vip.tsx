import { LayoutContainer } from '@worksheets/ui/layout';
import { DynamicVIPScreen } from '@worksheets/ui/pages/vip';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { vipSeo } from '../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...vipSeo} />
    <DynamicVIPScreen />
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
