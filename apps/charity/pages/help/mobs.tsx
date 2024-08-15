import { helpMobs } from '@worksheets/ui/components/help';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { helpPageJson, HelpScreen } from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpMobsSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpMobsSeo} />
      <HelpScreen
        title={'Boss Fights'}
        description={
          'Boss fights are global events that allow you to team up with other players to defeat a powerful boss. You can earn rewards by participating in boss fights.'
        }
        qa={helpMobs}
      />
      <FAQPageJsonLd mainEntity={helpPageJson(helpMobs)} />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
