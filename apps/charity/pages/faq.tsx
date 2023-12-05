import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQScreen } from '@worksheets/ui/pages/faq';
import { LayoutContainer } from '../containers/layout-container';

const Page: NextPageWithLayout = () => <FAQScreen />;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
