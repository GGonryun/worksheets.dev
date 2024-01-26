import { developers, games } from '@worksheets/data-access/charity-games';
import { MixedGridItem } from '@worksheets/ui/game-grid';
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

import { mixedItems } from '../../util/mixed-items';
import { gameJsonLd, gameSeo } from '../../util/seo';

type Props = {
  game: SerializableGameSchema;
  seo: NextSeoProps;
  jsonLd: VideoGameJsonLdProps;
  items: MixedGridItem[];
  developer: DeveloperSchema;
};

const Page: NextPageWithLayout<Props> = ({
  game,
  seo,
  jsonLd,
  items,
  developer,
}) => {
  return (
    <>
      <NextSeo {...seo} />
      <DynamicGameScreenContainer
        game={game}
        developer={developer}
        randomGame={randomGame}
        gridItems={items}
      />
      <VideoGameJsonLd {...jsonLd} />
    </>
  );
};

export const getServerSideProps = (async (ctx) => {
  const { params } = ctx;

  const gameId = params?.gameId as string;
  const game = games.find((game) => game.id === gameId);
  const developer = developers.find(
    (developer) => developer.id === game?.developerId
  );

  if (!game || !developer)
    return {
      notFound: true,
    };

  const items: MixedGridItem[] = mixedItems({
    hideAds: true,
    maxGames: 50,
    maxTags: 10,
  }).map(shrinkGames);

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
      items,
      seo,
      jsonLd,
    },
  };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <DynamicLayout>{page}</DynamicLayout>;
};

export default Page;

function shrinkGames(item: MixedGridItem) {
  if (item.type === 'game') {
    return {
      ...item,
      span: 1,
    };
  } else return item;
}
