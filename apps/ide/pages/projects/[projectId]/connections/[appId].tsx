import { ConnectionsPage } from '@worksheets/ui/worksheets';
import { useRouter } from 'next/router';
import { WebsiteLayout } from '@worksheets/ui/worksheets';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  const { query } = useRouter();
  const appId = query.appId as string;
  return <ConnectionsPage appId={appId} />;
};

Page.getLayout = (page) => {
  return (
    <WebsiteLayout
      title={`Create App Connection`}
      FooterProps={{ withMarketing: true }}
    >
      {page}
    </WebsiteLayout>
  );
};

export default Page;
