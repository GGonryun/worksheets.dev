import { CookiePolicyScreen } from '@worksheets/ui/pages/cookie-policy';
import { NextPageWithLayout } from '@worksheets/util-next';

import { LayoutContainer } from '../containers/layout-container';

const Page: NextPageWithLayout = () => <CookiePolicyScreen />;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
