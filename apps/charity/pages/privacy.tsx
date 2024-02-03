import { Layout } from '@worksheets/ui/layout';
import { PrivacyPolicyScreen } from '@worksheets/ui/pages/privacy-policy';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => <PrivacyPolicyScreen />;

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Page;
