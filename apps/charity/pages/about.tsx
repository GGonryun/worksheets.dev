import { NextPageWithLayout } from '@worksheets/util-next';
import { AboutScreen } from '@worksheets/ui-charity';
import { LayoutContainer } from '../containers/layout-container';

const Page: NextPageWithLayout = () => <AboutScreen />;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
