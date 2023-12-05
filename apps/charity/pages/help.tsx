import { NextPageWithLayout } from '@worksheets/util-next';
import { HelpScreen } from '@worksheets/ui/pages/help';
import { LayoutContainer } from '../containers/layout-container';

const Page: NextPageWithLayout = () => <HelpScreen />;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
