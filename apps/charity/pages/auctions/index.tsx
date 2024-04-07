import { AppLayoutContainer } from '@worksheets/ui/layout';
import { UnderConstruction } from '@worksheets/ui/pages/under-construction';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { auctionsSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...auctionsSeo} />
      <UnderConstruction />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
