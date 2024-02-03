import { LayoutContainer } from '@worksheets/ui/layout';
import { PrivacyPolicyScreen } from '@worksheets/ui/pages/privacy-policy';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => <PrivacyPolicyScreen />;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
