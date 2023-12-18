import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../containers/layout-container';
import { ContributionScreen } from '@worksheets/ui/pages/contributions';

const Page: NextPageWithLayout = () => <ContributionScreen />;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
