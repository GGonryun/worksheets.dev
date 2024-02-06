import { LayoutContainer } from '@worksheets/ui/layout';
import { DynamicAccountScreen } from '@worksheets/ui/pages/account';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { accountPrizesSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo noindex {...accountPrizesSeo} />
      <DynamicAccountScreen />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
