import { AppLayoutContainer } from '@worksheets/ui/layout';
import { TeamsScreenContainer } from '@worksheets/ui/pages/teams';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => <TeamsScreenContainer />;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
