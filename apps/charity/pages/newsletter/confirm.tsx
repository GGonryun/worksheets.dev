import { LayoutContainer } from '@worksheets/ui/layout';
import { DynamicConfirmNewsletterScreen } from '@worksheets/ui/pages/newsletter';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { confirmSubscriptionSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...confirmSubscriptionSeo} />
      <DynamicConfirmNewsletterScreen />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
