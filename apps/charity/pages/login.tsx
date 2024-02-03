import { LayoutContainer } from '@worksheets/ui/layout';
import { DynamicLoginScreen } from '@worksheets/ui/pages/login';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo noindex={true} />
      <DynamicLoginScreen />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
