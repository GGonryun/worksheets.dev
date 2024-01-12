import { createServerSideTRPC } from '@worksheets/trpc-charity/server';
import {
  contributionFaq,
  ContributionScreen,
} from '@worksheets/ui/pages/contributions';
import { BasicWebsiteStatistics } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
import { FAQPageJsonLd, NextSeo } from 'next-seo';

import { LayoutContainer } from '../../containers/layout-container';
import { contributeSeo } from '../../util/seo';

type Props = {
  statistics: BasicWebsiteStatistics;
};

const Page: NextPageWithLayout<Props> = ({ statistics }) => {
  return (
    <>
      <NextSeo {...contributeSeo} />
      <ContributionScreen statistics={statistics} faq={contributionFaq} />
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

export const getServerSideProps = (async (ctx) => {
  const trpc = await createServerSideTRPC(ctx);

  const statistics = await trpc.usage.contributions.fetch();

  return {
    props: {
      statistics,
    },
  };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
