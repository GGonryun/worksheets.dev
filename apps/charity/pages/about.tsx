import { NextPageWithLayout } from '@worksheets/util-next';
import { AboutScreen } from '@worksheets/ui/pages/about';
import { LayoutContainer } from '../containers/layout-container';
import { NextSeo } from 'next-seo';

const openGraph = {
  url: 'https://charity.games/about',
  title: 'Charity Games - About Us',
};
const Page: NextPageWithLayout = () => (
  <>
    <NextSeo
      title={openGraph.title}
      canonical={openGraph.url}
      openGraph={openGraph}
    />
    <AboutScreen />
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
