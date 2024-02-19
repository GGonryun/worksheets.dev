import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { LayoutContainer } from '@worksheets/ui/layout';
import { DynamicGameScreenContainer } from '@worksheets/ui/pages/game';
import { routes } from '@worksheets/ui/routes';
import { printDate } from '@worksheets/util/time';
import {
  DeveloperSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
  NextSeo,
  NextSeoProps,
  VideoGameJsonLd,
  VideoGameJsonLdProps,
} from 'next-seo';

import { gameJsonLd, gameSeo } from '../../util/seo';

type Props = {
  game: SerializableGameSchema;
  seo: NextSeoProps;
  jsonLd: VideoGameJsonLdProps;
  developer: DeveloperSchema;
};

const Page: NextPageWithLayout<Props> = ({ game, seo, jsonLd, developer }) => {
  return (
    <>
      <NextSeo {...seo} />
      <DynamicGameScreenContainer game={game} developer={developer} />
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
    const { game, developer } = await trpc.public.games.find.fetch({
      gameId,
    });

    const seo = gameSeo(game, developer);
    const jsonLd = gameJsonLd(game, developer);

    return {
      props: {
        game: {
          ...game,
          updatedAt: printDate(game.updatedAt),
          createdAt: printDate(game.createdAt),
        },
        developer,
        seo,
        jsonLd,
      },
    };
  } catch (error) {
    console.error(`Error fetching game ${gameId}`, error);
    return {
      redirect: {
        destination: routes.games.path(),
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
        gameId: game,
      },
    })),
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths<{ gameId: string }>;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
