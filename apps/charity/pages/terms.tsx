import { TermsOfServiceScreen } from '@worksheets/ui/pages/terms-of-service';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { DynamicLayout } from '../dynamic/dynamic-layout';
import { termsSeo } from '../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...termsSeo} />
    <TermsOfServiceScreen />
  </>
);

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
