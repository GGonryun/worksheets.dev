import CircularProgress from '@mui/material/CircularProgress';
import { developers, games } from '@worksheets/data-access/charity-games';
import { MixedGridItem } from '@worksheets/ui/game-grid';
import { AbsolutelyCentered } from '@worksheets/ui-core';
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

import { GameScreenContainer } from '../../containers/game-screen-container';
import { LayoutContainer } from '../../containers/layout-container';
import { AdsensePushScript } from '../../scripts';
import { mixedItems } from '../../util/mixed-items';
import { getRandomGame } from '../../util/randomizer';
import { gameJsonLd, gameSeo } from '../../util/seo';

type Props = {
  game: SerializableGameSchema;
  seo: NextSeoProps;
  jsonLd: VideoGameJsonLdProps;
  items: MixedGridItem[];
  developer: DeveloperSchema;
  randomGame: string;
};

const Page: NextPageWithLayout<Props> = ({
  game,
  seo,
  jsonLd,
  items,
  developer,
  randomGame,
}) => {
  return (
    <>
      <NextSeo {...seo} />
      <GameScreenContainer
        game={game}
        developer={developer}
        randomGame={randomGame}
        gridItems={items}
      />
      <VideoGameJsonLd {...jsonLd} />
      <AdsensePushScript />
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
    return (
      <AbsolutelyCentered>
        <CircularProgress size={100} color="error" sx={{ mt: -10 }} />
      </AbsolutelyCentered>
    );

  const randomGame = getRandomGame(true);
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
        // // TODO: fetch from api.
        updatedAt: printDate(game.updatedAt),
        createdAt: printDate(game.createdAt),
        // TODO: fetch from api.
      },
      developer,
      items,
      seo,
      jsonLd,
      randomGame: randomGame.id,
    },
  };
}) satisfies GetServerSideProps<Props>;

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
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
