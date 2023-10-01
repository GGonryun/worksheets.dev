import { MarketingLayout, PlaceholderPage } from '@worksheets/ui/marketing';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <PlaceholderPage />;
};

Page.getLayout = (page) => {
  return <MarketingLayout>{page}</MarketingLayout>;
};

export default Page;
