import { NextPageWithLayout } from '@worksheets/util-next';
import { HomePageContainer } from '../containers/home-page';
import { LayoutContainer } from '../containers/layout-container';
import { NextSeo } from 'next-seo';
import { homeSeo } from '../util/seo';
import { useGoogleAdsense } from '@worksheets/ui/advertisements';

const Page: NextPageWithLayout = () => {
  useGoogleAdsense();

  return (
    <>
      <NextSeo {...homeSeo} />
      <HomePageContainer />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
