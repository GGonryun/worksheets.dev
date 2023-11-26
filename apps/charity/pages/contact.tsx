import { NextPageWithLayout } from '@worksheets/util-next';
import { Layout, ContactScreen } from '@worksheets/ui-charity';

const Page: NextPageWithLayout = () => <ContactScreen />;

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Page;
