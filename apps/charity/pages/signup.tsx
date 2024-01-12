import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { LayoutContainer } from '../containers/layout-container';
import { SignUpScreenContainer } from '../containers/sign-up-screen-container';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo noindex={true} />
    <SignUpScreenContainer />
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
