import { helpPrizes } from '@worksheets/ui/components/help';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { helpPageJson, HelpScreen } from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpPrizesSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpPrizesSeo} />
      <HelpScreen
        title={'Prizes & Rewards'}
        description={
          'Get instant prizes and rewards. The Prize Wall is a great way to earn instant prizes and rewards. Find out how to earn prizes and how to win prizes.'
        }
        qa={helpPrizes}
      />
      <FAQPageJsonLd mainEntity={helpPageJson(helpPrizes)} />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
