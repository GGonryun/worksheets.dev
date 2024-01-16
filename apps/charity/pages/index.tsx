import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { HomePageContainer } from '../containers/home-page';
import { DynamicLayout } from '../dynamic/dynamic-layout';
import { AdsensePushScript } from '../scripts';
import { homeSeo } from '../util/seo';

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
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
