import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../containers/layout-container';
import { NextSeo } from 'next-seo';
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
