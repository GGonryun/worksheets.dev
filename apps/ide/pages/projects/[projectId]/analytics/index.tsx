import { DashboardPage, WebsiteLayout } from '@worksheets/ui/worksheets';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <DashboardPage />;
};

Page.getLayout = (page) => {
  return <WebsiteLayout title="Analytics">{page}</WebsiteLayout>;
};

export default Page;
