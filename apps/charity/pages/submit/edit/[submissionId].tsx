import { NextPageWithLayout } from '@worksheets/util-next';
import { GameSubmissionScreenContainer } from '../../../containers/game-submission-screen-container';
import { LayoutContainer } from '../../../containers/layout-container';
import { submitGameSeo } from '../../../util/seo';

import { NextSeo } from 'next-seo';

type Props = {
  submissionId: string;
};

const Page: NextPageWithLayout<Props> = (props) => {
  // TODO: implement this page
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
