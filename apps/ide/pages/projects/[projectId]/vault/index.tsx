import { VaultPage, WebsiteLayout } from '@worksheets/ui/worksheets';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <VaultPage />;
};

Page.getLayout = (page) => {
  return <WebsiteLayout title="Vault">{page}</WebsiteLayout>;
};

export default Page;
