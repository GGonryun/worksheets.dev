import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicSignUpScreen } from '@worksheets/ui/pages/login';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { signUpSeo } from '../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...signUpSeo} />
    <DynamicSignUpScreen />
  </>
);

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
