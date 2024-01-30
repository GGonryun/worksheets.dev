import { trpc } from '@worksheets/trpc-charity';
import { DynamicLayout } from '@worksheets/ui/layout';
import {
  contributionFaq,
  ContributionScreen,
} from '@worksheets/ui/pages/contributions';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { NextPageWithLayout } from '@worksheets/util-next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { helpDevelopersSeo } from '../../util/seo';

const Page: NextPageWithLayout = () => {
  const statistics = trpc.usage.contributions.useQuery();

  if (statistics.error) return <ErrorScreen />;

  if (statistics.isLoading) return <LoadingScreen />;

  return (
    <>
      <NextSeo {...helpDevelopersSeo} />
      <ContributionScreen statistics={statistics.data} faq={contributionFaq} />
      <FAQPageJsonLd
        mainEntity={contributionFaq
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
