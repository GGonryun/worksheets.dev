import { NextPageWithLayout } from '@worksheets/util-next';
import { TermsOfServiceScreen } from '@worksheets/ui/pages/terms-of-service';
import { LayoutContainer } from '../containers/layout-container';
import { NextSeo } from 'next-seo';
import { termsSeo } from '../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...termsSeo} />
    <TermsOfServiceScreen />
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
