import { DynamicLayout } from '@worksheets/ui/layout';
import { CookiePolicyScreen } from '@worksheets/ui/pages/cookie-policy';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => <CookiePolicyScreen />;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
