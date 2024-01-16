import { GameSubmissionSuccessScreen } from '@worksheets/ui/pages/game-submissions';
import { NextPageWithLayout } from '@worksheets/util-next';

import { DynamicLayout } from '../../dynamic/dynamic-layout';

const Page: NextPageWithLayout = () => {
  return <GameSubmissionSuccessScreen />;
};

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
