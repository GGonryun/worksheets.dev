import { ConnectionsPage } from '@worksheets/ui/connections';
import { WebsiteLayout } from '@worksheets/ui/worksheets';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <ConnectionsPage appId="" />;
};

Page.getLayout = (page) => {
  return <WebsiteLayout title="Connections">{page}</WebsiteLayout>;
};

export default Page;
