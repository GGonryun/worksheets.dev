import { MarketingLayout } from '@worksheets/ui/marketing';
import { ProjectsPage } from '@worksheets/ui-projects';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <ProjectsPage />;
};

Page.getLayout = (page) => {
  return <MarketingLayout title="Projects">{page}</MarketingLayout>;
};

export default Page;
