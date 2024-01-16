import { UnderConstruction } from '@worksheets/ui/pages/under-construction';
import { NextPageWithLayout } from '@worksheets/util-next';

import { DynamicLayout } from '../dynamic/dynamic-layout';

const Page: NextPageWithLayout = () => <UnderConstruction />;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
