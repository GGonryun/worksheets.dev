import { AdsensePushScript } from '@worksheets/ui/components/advertisements';
import { DynamicLayout } from '@worksheets/ui/layout';
import { DynamicArcadeScreen } from '@worksheets/ui/pages/arcade';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { homeSeo } from '../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...homeSeo} />
      <DynamicArcadeScreen />
      <AdsensePushScript />
    </>
  );
};

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
