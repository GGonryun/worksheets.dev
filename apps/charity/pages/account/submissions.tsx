import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { AccountScreenContainer } from '../../containers/account-screen-container';
import { DynamicLayout } from '../../dynamic/dynamic-layout';
import { accountSubmissionsSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo noindex {...accountSubmissionsSeo} />
      <AccountScreenContainer />
    </>
  );
};

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
