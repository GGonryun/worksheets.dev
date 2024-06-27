import { DynamicIdentifyUserSessionReplay } from '@worksheets/ui/components/session-replay';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicAccountScreen } from '@worksheets/ui/pages/account';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { accountQuestsSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo noindex {...accountQuestsSeo} />
      <DynamicIdentifyUserSessionReplay />
      <DynamicAccountScreen />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
