import { DynamicLayout } from '@worksheets/ui/layout';
import { ContactScreen } from '@worksheets/ui/pages/contact';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { contactSeo } from '../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...contactSeo} />
    <ContactScreen />
  </>
);

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
