import { ConnectionsPage } from '@worksheets/ui/worksheets';
import { WebsiteLayout } from '@worksheets/ui/worksheets';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <ConnectionsPage appId="" />;
};

Page.getLayout = (page) => {
  return (
    <WebsiteLayout title="Connections" FooterProps={{ withMarketing: true }}>
      {page}
    </WebsiteLayout>
  );
};

export default Page;
