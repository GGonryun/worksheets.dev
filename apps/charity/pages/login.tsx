import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { LayoutContainer } from '../containers/layout-container';
import { LoginScreenContainer } from '../containers/login-screen-container';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo noindex={true} />
      <LoginScreenContainer />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
