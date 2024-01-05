import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';

import { NextSeo } from 'next-seo';
import { submitGameSeo } from '../../util/seo';
import { GameSubmissionScreenContainer } from '../../containers/game-submission-screen-container';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...submitGameSeo} />
      <GameSubmissionScreenContainer />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
