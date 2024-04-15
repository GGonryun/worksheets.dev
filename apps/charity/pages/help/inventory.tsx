import { AppLayoutContainer } from '@worksheets/ui/layout';
import {
  helpInventory,
  helpPageJson,
  HelpScreen,
} from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpInventorySeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpInventorySeo} />
      <HelpScreen
        title={'Inventory'}
        description={
          "The inventory contains all the items you've won or purchased on the Charity Games platform. The more you play, the more items you'll collect!"
        }
        qa={helpInventory}
      />
      <FAQPageJsonLd mainEntity={helpPageJson(helpInventory)} />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
