import { ServicesPage, WebsiteLayout } from '@worksheets/ui/worksheets';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <ServicesPage />;
};

Page.getLayout = (page) => {
  return (
    <WebsiteLayout title="Services" FooterProps={{ withMarketing: true }}>
      {page}
    </WebsiteLayout>
  );
};

export default Page;
