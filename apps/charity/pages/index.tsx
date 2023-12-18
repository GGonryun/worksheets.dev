import { NextPageWithLayout } from '@worksheets/util-next';
import { HomePageContainer } from '../containers/home-page';
import { LayoutContainer } from '../containers/layout-container';
import { NextSeo } from 'next-seo';
import { homeSeo } from '../util/seo';
import { AdsensePushScript } from '../scripts';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...homeSeo} />
      <HomePageContainer />
      <AdsensePushScript />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
