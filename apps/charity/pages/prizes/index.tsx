import { DynamicLayout } from '@worksheets/ui/layout';
import { DynamicPrizeWallScreen } from '@worksheets/ui/pages/prizes';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => <DynamicPrizeWallScreen />;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
