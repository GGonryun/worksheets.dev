import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicCreateGameSubmissionScreen } from '@worksheets/ui/pages/game-submissions';
import { NextPageWithLayout } from '@worksheets/util-next';
import { NextSeo } from 'next-seo';

import { createGameSubmissionSeo } from '../../../util/seo';

const Page: NextPageWithLayout = () => (
  <>
    <NextSeo {...createGameSubmissionSeo} />
    <DynamicCreateGameSubmissionScreen />
  </>
);

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
