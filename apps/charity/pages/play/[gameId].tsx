import { createStaticTRPC } from '@worksheets/trpc-charity/server';
import { SEO } from '@worksheets/ui/components/seo';
import { DynamicLayout } from '@worksheets/ui/layout';
import { DynamicGameScreenContainer } from '@worksheets/ui/pages/game';
import { printDate } from '@worksheets/util/time';
import {
  DeveloperSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { NextSeoProps, VideoGameJsonLd, VideoGameJsonLdProps } from 'next-seo';

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
      <Head>
        <SEO
          title={`${game.name} - Charity Games - Free Online Arcade`}
          path={`/play/${game.id}`}
          description={`Play ${game.name} by ${developer.name} online for free on Charity Games. ${game.name} is one of our top ${game.categories[0]} games. `}
          image={{
            url: game.bannerUrl,
            alt: game.name,
          }}
        />
      </Head>
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
    const { game, developer } = await trpc.game.find.fetch({
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
        destination: '/play',
        permanent: false,
      },
    };
  }
}) satisfies GetStaticProps<Props>;

export const getStaticPaths = (async (ctx) => {
  const trpc = await createStaticTRPC(ctx);

  const games = await trpc.game.list.fetch();

  return {
    paths: games.map((game) => ({
      params: {
        gameId: game,
      },
    })),
    fallback: false,
  };
}) satisfies GetStaticPaths<{ gameId: string }>;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
