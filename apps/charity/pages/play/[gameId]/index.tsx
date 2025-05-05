import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { AppLayoutContainer } from '@worksheets/ui/layout';
import {
  DynamicFallbackGameScreenContainer,
  DynamicGameScreenContainer,
} from '@worksheets/ui/pages/game';
import { printDate } from '@worksheets/util/time';
import { SerializableGameSchema, TeamSchema } from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import {
  NextSeo,
  NextSeoProps,
  VideoGameJsonLd,
  VideoGameJsonLdProps,
} from 'next-seo';

import { gameJsonLd, gameSeo } from '../../../util/seo';

type Props = {
  game: SerializableGameSchema;
  team: TeamSchema;
  seo: NextSeoProps;
  jsonLd: VideoGameJsonLdProps;
};

const Page: NextPageWithLayout<Props> = ({ game, seo, team, jsonLd }) => {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <NextSeo {...gameSeo()} />
        <DynamicFallbackGameScreenContainer />
      </>
    );
  }
  return (
    <>
      <NextSeo {...seo} />
      <DynamicGameScreenContainer game={game} team={team} />
      <VideoGameJsonLd {...jsonLd} />
    </>
  );
};

export const getStaticProps = (async (ctx) => {
  const { params } = ctx;
  const trpc = await createStaticTRPC(ctx);

  const gameId = params?.gameId as string;

  if (!gameId) {
    return {
      notFound: true,
    };
  }

  try {
    const game = await trpc.public.games.find.fetch({
      id: gameId,
    });

    const team = await trpc.public.games.team.find.fetch({
      gameId,
    });

    const seo = gameSeo(game, team);
    const jsonLd = gameJsonLd(game, team);

    return {
      props: {
        game: {
          ...game,
          updatedAt: printDate(game.updatedAt),
          createdAt: printDate(game.createdAt),
        },
        team,
        seo,
        jsonLd,
      },
      revalidate: 60, // revalidate every minute
    };
  } catch (error) {
    console.error(`Error fetching game ${gameId}`, error);
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
}) satisfies GetStaticProps<Props>;

export const getStaticPaths = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  const games = await trpc.public.games.list.fetch({});

  return {
    paths: games.map((game) => ({
      params: {
        gameId: game.id,
      },
    })),
    fallback: true,
  };
}) satisfies GetStaticPaths<{ gameId: string }>;

Page.getLayout = (page) => {
  return <AppLayoutContainer>{page}</AppLayoutContainer>;
};

export default Page;
