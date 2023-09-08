import { SchemasPage, WebsiteLayout } from '@worksheets/ui/worksheets';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <SchemasPage />;
};

Page.getLayout = (page) => {
  return <WebsiteLayout title="Schemas">{page}</WebsiteLayout>;
};

export default Page;
