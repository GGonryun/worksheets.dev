import { NextPageWithLayout } from '@worksheets/util-next';
import { TermsOfServiceScreen } from '@worksheets/ui/pages/terms-of-service';
import { LayoutContainer } from '../containers/layout-container';

const Page: NextPageWithLayout = () => <TermsOfServiceScreen />;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
