import { NextPageWithLayout } from '@worksheets/util-next';
import { Layout, FAQScreen } from '@worksheets/ui-charity';

const Page: NextPageWithLayout = () => <FAQScreen />;

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Page;
