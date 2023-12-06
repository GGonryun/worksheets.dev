import { NextPageWithLayout } from '@worksheets/util-next';
import { HomePageContainer } from '../containers/home-page';
import { LayoutContainer } from '../containers/layout-container';
import { NextSeo } from 'next-seo';

const openGraph = {
  url: 'https://charity.games/',
  title: 'Charity Games - Free Online Games that Support Charity',
  description:
    'On Charity Games you can play free online HTML browser games that donate money to charitable causes. Play alone or with friends. We support mobile and desktop games.',
};

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title={openGraph.title}
        description={openGraph.description}
        canonical={openGraph.url}
        openGraph={openGraph}
      />
      <HomePageContainer />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;

// Want to play Cats Drop? Play this game online for free on Poki. Lots of fun to play when bored. Cats Drop is one of our favorite puzzle games.
