import { NextPageWithLayout } from '@worksheets/util-next';
import { Layout, UnderConstruction } from '@worksheets/ui-charity';

const Page: NextPageWithLayout = () => <UnderConstruction />;

Page.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Page;
