import { LayoutContainer } from '@worksheets/ui/layout';
import { HelpScreen } from '@worksheets/ui/pages/help';
import { QuestionAnswer } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpReferralsSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  const qa: QuestionAnswer[] = [];
  return (
    <>
      <NextSeo {...helpReferralsSeo} />
      <HelpScreen
        title={'Referrals'}
        description={
          'Referring friends to Charity Games is a great way to earn tokens and rewards. Find out how to refer friends and how to earn tokens for referring friends.'
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
