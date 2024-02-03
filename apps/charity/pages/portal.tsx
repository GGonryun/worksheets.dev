import { LayoutContainer } from '@worksheets/ui/layout';
import { DynamicLoginPortal } from '@worksheets/ui/pages/login';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo title="Charity Games - Login Portal" noindex />
    <DynamicLoginPortal />
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
