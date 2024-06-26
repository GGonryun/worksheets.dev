import { AppLayoutContainer } from '@worksheets/ui/layout';
import { CookiePolicyScreen } from '@worksheets/ui/pages/cookie-policy';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { cookiesSeo } from '../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...cookiesSeo} />
    <CookiePolicyScreen />
  </>
);

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
