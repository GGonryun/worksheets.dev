import { NextPageWithLayout } from '@worksheets/util-next';
import { HomePageContainer } from '../containers/home-page';
import { LayoutContainer } from '../containers/layout-container';
import { NextSeo } from 'next-seo';
import { homeSeo } from '../util/seo';

const Page: NextPageWithLayout = () => {
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

// Want to play Cats Drop? Play this game online for free on Poki. Lots of fun to play when bored. Cats Drop is one of our favorite puzzle games.
