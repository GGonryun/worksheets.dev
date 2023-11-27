import { NextPageWithLayout } from '@worksheets/util-next';
import { ContactScreen } from '@worksheets/ui-charity';
import { LayoutContainer } from '../containers/layout-container';

const Page: NextPageWithLayout = () => <ContactScreen />;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
