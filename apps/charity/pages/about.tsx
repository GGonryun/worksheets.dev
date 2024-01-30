import { DynamicLayout } from '@worksheets/ui/layout';
import { AboutScreen } from '@worksheets/ui/pages/about';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { aboutSeo } from '../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...aboutSeo} />
    <AboutScreen />
  </>
);

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
