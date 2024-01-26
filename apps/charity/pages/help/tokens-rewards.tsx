import { DynamicLayout } from '@worksheets/ui/layout';
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
        title={'Tokens & Rewards'}
        description={
          'Charity Games converts your playtime into tokens, which you can use to redeem rewards. Find out how to earn tokens and how to redeem them for real world prize sand rewards'
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
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
