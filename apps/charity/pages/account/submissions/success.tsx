import { LayoutContainer } from '@worksheets/ui/layout';
import { GameSubmissionSuccessScreen } from '@worksheets/ui/pages/game-submissions';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <GameSubmissionSuccessScreen />;
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
