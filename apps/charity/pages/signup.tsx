import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../containers/layout-container';
import { NextSeo } from 'next-seo';
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
