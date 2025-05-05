import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { TeamScreen } from '@worksheets/ui/pages/teams';
import { BasicGameInfo, TeamSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { NextSeo, NextSeoProps } from 'next-seo';

import { teamSeo } from '../../util/seo';

type Props = {
  team: TeamSchema;
  games: BasicGameInfo[];
  seo: NextSeoProps;
};

const Page: NextPageWithLayout<Props> = ({ team, games, seo }) => {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <ErrorScreen
        title="Loading..."
        header=""
        message="We're current building this page, please come back in a few minutes!"
      />
    );
  }

  return (
    <>
      <NextSeo {...seo} />
      <TeamScreen team={team} games={games} />
    </>
  );
};

export const getStaticProps = (async (ctx) => {
  const { params } = ctx;
  const trpc = await createStaticTRPC(ctx);

  const teamId = params?.teamId as string;

  if (!teamId) {
    return {
      notFound: true,
    };
  }

  const team = await trpc.public.teams.find.fetch({
    id: teamId,
  });
  const games = await trpc.public.teams.games.list.fetch({
    id: teamId,
  });

  return {
    props: { games, team, seo: teamSeo(team) },
    revalidate: 60, // revalidate every minute
  };
}) satisfies GetStaticProps<Props>;

export const getStaticPaths = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  const teams = await trpc.public.teams.list.fetch();

  return {
    paths: teams.map((team) => ({
      params: {
        teamId: team.id,
      },
    })),
    fallback: true,
  };
}) satisfies GetStaticPaths<{ teamId: string }>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
