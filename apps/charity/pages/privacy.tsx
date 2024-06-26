import { AppLayoutContainer } from '@worksheets/ui/layout';
import { PrivacyPolicyScreen } from '@worksheets/ui/pages/privacy-policy';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { privacySeo } from '../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...privacySeo} />
    <PrivacyPolicyScreen />
  </>
);

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
