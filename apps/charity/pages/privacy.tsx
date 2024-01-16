import { PrivacyPolicyScreen } from '@worksheets/ui/pages/privacy-policy';
import { NextPageWithLayout } from '@worksheets/util-next';

import { DynamicLayout } from '../dynamic/dynamic-layout';

const Page: NextPageWithLayout = () => <PrivacyPolicyScreen />;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
