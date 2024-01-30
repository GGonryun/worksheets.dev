import { DynamicLayout } from '@worksheets/ui/layout';
import { DynamicReceiptScreen } from '@worksheets/ui/pages/receipts';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { donationsSeo } from '../util/seo';
const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...donationsSeo} />
      <DynamicReceiptScreen />
    </>
  );
};

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
