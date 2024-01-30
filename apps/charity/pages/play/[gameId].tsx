import { createServerSideTRPC } from '@worksheets/trpc-charity/server';
import { DynamicLayout } from '@worksheets/ui/layout';
import { DynamicGameScreenContainer } from '@worksheets/ui/pages/game';
import { printDate } from '@worksheets/util/time';
import {
  DeveloperSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { NextPageWithLayout } from '@worksheets/util-next';
import { GetServerSideProps } from 'next';
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

export const getServerSideProps = (async (ctx) => {
  const { params } = ctx;
  const trpc = await createServerSideTRPC(ctx);

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
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;
