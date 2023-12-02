import { NextPageWithLayout } from '@worksheets/util-next';
import { CookiePolicyScreen } from '@worksheets/ui-charity';
import { LayoutContainer } from '../containers/layout-container';

const Page: NextPageWithLayout = () => <CookiePolicyScreen />;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
