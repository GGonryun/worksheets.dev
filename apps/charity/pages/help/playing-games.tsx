import { LayoutContainer } from '@worksheets/ui/layout';
import { HelpScreen } from '@worksheets/ui/pages/help';
import { QuestionAnswer } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpPlayingGamesSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  const qa: QuestionAnswer[] = [];

  return (
    <>
      <NextSeo {...helpPlayingGamesSeo} />
      <HelpScreen
        title={'Playing Games'}
        description={
          'Playing games is a great way to earn points and rewards. We have a variety of games to choose from, including puzzles, arcade games, and more.'
        }
        qa={qa}
      />
      <FAQPageJsonLd
        mainEntity={qa
          .filter((data) => Boolean(data.summary))
          .map((data) => ({
            questionName: data.question,
            acceptedAnswerText: data.summary,
          }))}
      />
    </>
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
