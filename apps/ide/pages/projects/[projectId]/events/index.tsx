import { EventsPage, WebsiteLayout } from '@worksheets/ui/worksheets';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <EventsPage />;
};

Page.getLayout = (page) => {
  return <WebsiteLayout title="Events">{page}</WebsiteLayout>;
};

export default Page;
