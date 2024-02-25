import { AppLayoutContainer } from '@worksheets/ui/layout';
import { GameSubmissionSuccessScreen } from '@worksheets/ui/pages/game-submissions';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => {
  return <GameSubmissionSuccessScreen />;
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
