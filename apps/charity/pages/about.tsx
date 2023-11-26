import { NextPageWithLayout } from '@worksheets/util-next';
import { Layout, AboutScreen } from '@worksheets/ui-charity';

const Page: NextPageWithLayout = () => <AboutScreen />;

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Page;
