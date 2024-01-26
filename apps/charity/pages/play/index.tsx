import { DynamicLayout } from '@worksheets/ui/layout';
import { DynamicArcadeScreen } from '@worksheets/ui/pages/arcade';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { gamesSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...gamesSeo} />
      <DynamicArcadeScreen />
    </>
  );
};

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
