import { PrivacyPolicyScreen } from '@worksheets/ui/pages/privacy-policy';
import { NextPageWithLayout } from '@worksheets/util-next';

import { LayoutContainer } from '../containers/layout-container';

const Page: NextPageWithLayout = () => <PrivacyPolicyScreen />;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
