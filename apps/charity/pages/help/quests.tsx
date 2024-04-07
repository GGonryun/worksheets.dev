import { AppLayoutContainer } from '@worksheets/ui/layout';
import {
  helpPageJson,
  helpQuests,
  HelpScreen,
} from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpQuestsSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpQuestsSeo} />
      <HelpScreen
        title={'Quests'}
        description={
          'Quests are challenges on Charity Games that you can complete to earn tokens. There are different types of quests, such as daily quests, weekly quests, and one time achievements.'
        }
        qa={helpQuests}
      />
      <FAQPageJsonLd mainEntity={helpPageJson(helpQuests)} />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
