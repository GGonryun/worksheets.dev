import { UnderConstruction } from '@worksheets/ui/pages/under-construction';
import { NextPageWithLayout } from '@worksheets/util-next';

import { LayoutContainer } from '../../containers/layout-container';

const Page: NextPageWithLayout = () => <UnderConstruction />;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
