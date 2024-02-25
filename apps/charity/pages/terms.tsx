import { AppLayoutContainer } from '@worksheets/ui/layout';
import { TermsOfServiceScreen } from '@worksheets/ui/pages/terms-of-service';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { termsSeo } from '../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...termsSeo} />
    <TermsOfServiceScreen />
  </>
);

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
