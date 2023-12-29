import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../containers/layout-container';
import { NextSeo } from 'next-seo';
import { UnderConstruction } from '@worksheets/ui/pages/under-construction';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo noindex={true} />
    <UnderConstruction />
  </>
);

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
