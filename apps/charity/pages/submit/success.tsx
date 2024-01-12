import { GameSubmissionSuccessScreen } from '@worksheets/ui/pages/game-submissions';
import { NextPageWithLayout } from '@worksheets/util-next';

import { LayoutContainer } from '../../containers/layout-container';

const Page: NextPageWithLayout = () => {
  return <GameSubmissionSuccessScreen />;
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
