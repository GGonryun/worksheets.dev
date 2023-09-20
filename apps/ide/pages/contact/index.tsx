import { ContactPage } from '@worksheets/ui/worksheets';
import { MarketingLayout } from '@worksheets/ui/marketing';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <ContactPage />;
};

Page.getLayout = (page) => {
  return <MarketingLayout>{page}</MarketingLayout>;
};

export default Page;
