import { DynamicLayout } from '@worksheets/ui/layout';
import { HelpScreen } from '@worksheets/ui/pages/help';
import { QuestionAnswer } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpVIPSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  const qa: QuestionAnswer[] = [];
  return (
    <>
      <NextSeo {...helpVIPSeo} />
      <HelpScreen
        title={'VIP Membership'}
        description={
          'Want to accelerate your token earnings? Become a VIP member and earn more tokens for every game you play. Find out how to become a VIP member.'
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
