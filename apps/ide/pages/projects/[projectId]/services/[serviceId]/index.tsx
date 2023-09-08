import { ServiceDetailsPage, WebsiteLayout } from '@worksheets/ui/worksheets';
import { NextPageWithLayout } from '@worksheets/util-next';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  const { query } = useRouter();
  const serviceId = query.serviceId as string;
  return <ServiceDetailsPage serviceId={serviceId} />;
};

Page.getLayout = (page) => {
  return (
    <WebsiteLayout
      title="Service Details"
      FooterProps={{ withMarketing: true }}
    >
      {page}
    </WebsiteLayout>
  );
};

export default Page;
