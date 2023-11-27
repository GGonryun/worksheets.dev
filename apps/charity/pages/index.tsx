import { NextPageWithLayout } from '@worksheets/util-next';
import { HomePageContainer } from '../containers/home-page';
import { LayoutContainer } from '../containers/layout-container';

const Page: NextPageWithLayout = () => {
  return <HomePageContainer />;
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
