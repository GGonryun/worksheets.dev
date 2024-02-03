import { LayoutContainer } from '@worksheets/ui/layout';
import { HelpScreen } from '@worksheets/ui/pages/help';
import { QuestionAnswer } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpPrizeWallSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  const qa: QuestionAnswer[] = [];
  return (
    <>
      <NextSeo {...helpPrizeWallSeo} />
      <HelpScreen
        title={'Prize Wall'}
        description={
          'Get instant prizes and rewards. The Prize Wall is a great way to earn instant prizes and rewards. Find out how to earn prizes and how to win prizes.'
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
