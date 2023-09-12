import { NextPageWithLayout } from '@worksheets/util-next';

import { MarketingLayout } from '@worksheets/ui/marketing';
import { ApplicationsGalleryPage } from '@worksheets/ui/applications';

const Page: NextPageWithLayout = () => {
  return <ApplicationsGalleryPage />;
};

Page.getLayout = (page) => {
  return <MarketingLayout title="Applications">{page}</MarketingLayout>;
};

export default Page;
