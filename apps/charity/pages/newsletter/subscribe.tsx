import { LayoutContainer } from '@worksheets/ui/layout';
import { DynamicSubscribeNewsletterScreen } from '@worksheets/ui/pages/newsletter';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { subscribeSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...subscribeSeo} />
      <DynamicSubscribeNewsletterScreen />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
