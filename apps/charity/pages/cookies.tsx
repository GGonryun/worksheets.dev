import { CookiePolicyScreen } from '@worksheets/ui/pages/cookie-policy';
import { NextPageWithLayout } from '@worksheets/util-next';

import { DynamicLayout } from '../dynamic/dynamic-layout';

const Page: NextPageWithLayout = () => <CookiePolicyScreen />;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
