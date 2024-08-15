import { helpPlayingGames } from '@worksheets/ui/components/help';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { helpPageJson, HelpScreen } from '@worksheets/ui/pages/help';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpPlayingGamesSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo {...helpPlayingGamesSeo} />
      <HelpScreen
        title={'Playing Games'}
        description={
          'Playing games is a great way to earn points and rewards. We have a variety of games to choose from, including puzzles, arcade games, and more.'
        }
        qa={helpPlayingGames}
      />
      <FAQPageJsonLd mainEntity={helpPageJson(helpPlayingGames)} />
    </>
  );
};

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
