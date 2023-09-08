import { OverviewPage, WebsiteLayout } from '@worksheets/ui/worksheets';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <OverviewPage />;
};

Page.getLayout = (page) => {
  return (
    <WebsiteLayout
      FooterProps={{ withMarketing: true }}
      title="Project Overview"
    >
      {page}
    </WebsiteLayout>
  );
};

export default Page;
