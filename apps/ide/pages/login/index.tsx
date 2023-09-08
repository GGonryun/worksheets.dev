import { LoginPage } from '@worksheets/ui/login';
import { MarketingLayout } from '@worksheets/ui/marketing';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <LoginPage />;
};

Page.getLayout = (page) => {
  return (
    <MarketingLayout FooterProps={{ hideLinks: true }}>{page}</MarketingLayout>
  );
};

export default Page;
