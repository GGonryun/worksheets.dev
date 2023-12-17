import { NextPageWithLayout } from '@worksheets/util-next';
import { AboutScreen } from '@worksheets/ui/pages/about';
import { LayoutContainer } from '../containers/layout-container';
import { NextSeo } from 'next-seo';
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
