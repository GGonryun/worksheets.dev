import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { DynamicContestScreen } from '@worksheets/ui/pages/contests';
import { ContestSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo, NextSeoProps } from 'next-seo';

import { contestSeo } from '../../util/seo';

type Props = {
  seo: NextSeoProps;
  contest: ContestSchema;
};

const Page: NextPageWithLayout<Props> = ({ seo, contest }) => {
  return (
    <>
      <NextSeo {...seo} />
      <DynamicContestScreen contest={contest} />
    </>
  );
};

// Because contests are generated statically, we should always put them
// into a pending state and deploy new pages before they are live.
export const getStaticProps = (async (ctx) => {
  try {
    const { params } = ctx;

    const trpc = await createStaticTRPC(ctx);

    const contestId = Number(params?.contestId);

    const contest = await trpc.public.contests.find.fetch({ contestId });

    const seo = contestSeo(contest);

    return {
      props: {
        seo,
        contest,
      },
    };
  } catch (error) {
    console.error(`Failed to load contest`, error);
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps<Props>;

export const getStaticPaths = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  const contests = await trpc.public.contests.list.fetch({
    includeExpired: true,
  });

  return {
    paths: contests.map((contest) => ({
      params: {
        contestId: contest.id.toString(),
      },
    })),
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths<{ contestId: string }>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
