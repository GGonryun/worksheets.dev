import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicUnsubscribeNewsletterScreen } from '@worksheets/ui/pages/newsletter';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { unsubscribeSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...unsubscribeSeo} />
      <DynamicUnsubscribeNewsletterScreen />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
