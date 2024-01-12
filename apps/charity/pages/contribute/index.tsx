import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { FAQPageJsonLd, NextSeo } from 'next-seo';
import { contributeSeo } from '../../util/seo';
import { GetServerSideProps } from 'next';
import { createServerSideTRPC } from '@worksheets/trpc-charity/server';
import { BasicWebsiteStatistics } from '@worksheets/util/types';
import {
  ContributionScreen,
  contributionFaq,
} from '@worksheets/ui/pages/contributions';

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
