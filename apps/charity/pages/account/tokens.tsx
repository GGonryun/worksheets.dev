import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { AccountScreenContainer } from '../../containers/account-screen-container';
import { DynamicLayout } from '../../dynamic/dynamic-layout';
import { accountTokensSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo noindex {...accountTokensSeo} />
      <AccountScreenContainer />
    </>
  );
};

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
