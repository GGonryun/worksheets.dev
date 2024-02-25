import { AppLayoutContainer } from '@worksheets/ui/layout';
import { UnderConstruction } from '@worksheets/ui/pages/under-construction';
import { NextPageWithLayout } from '@worksheets/util-next';

const Page: NextPageWithLayout = () => <UnderConstruction />;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
