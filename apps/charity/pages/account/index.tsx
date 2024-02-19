import { DynamicIdentifyUserSessionReplay } from '@worksheets/ui/components/session-replay';
import { LayoutContainer } from '@worksheets/ui/layout';
import { DynamicAccountScreen } from '@worksheets/ui/pages/account';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { accountProfileSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo noindex {...accountProfileSeo} />
      <DynamicIdentifyUserSessionReplay />
      <DynamicAccountScreen />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
