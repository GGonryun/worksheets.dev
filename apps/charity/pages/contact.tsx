import { NextPageWithLayout } from '@worksheets/util-next';
import { ContactScreen } from '@worksheets/ui/pages/contact';
import { LayoutContainer } from '../containers/layout-container';
import { NextSeo } from 'next-seo';
import { contactSeo } from '../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...contactSeo} />
    <ContactScreen />
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
