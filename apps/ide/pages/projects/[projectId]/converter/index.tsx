import { ConverterPage, WebsiteLayout } from '@worksheets/ui/worksheets';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <ConverterPage />;
};

Page.getLayout = (page) => {
  return <WebsiteLayout title="Code Converter">{page}</WebsiteLayout>;
};

export default Page;
