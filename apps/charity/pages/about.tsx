import { AboutScreen } from '@worksheets/ui/pages/about';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { LayoutContainer } from '../containers/layout-container';
import { aboutSeo } from '../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...aboutSeo} />
    <AboutScreen />
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
