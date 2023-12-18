import { MixedGridItem } from '@worksheets/ui/game-grid';
import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { mixedItems } from '../../util/mixed-items';
import CircularProgress from '@mui/material/CircularProgress';
import { printDate } from '@worksheets/util/time';
import { AbsolutelyCentered } from '@worksheets/ui-core';
import { developers, games } from '@worksheets/data-access/charity-games';
import { GameDescription, GameScreen } from '@worksheets/ui/pages/game';
import { getRandomGame } from '../../util/randomizer';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import {
  NextSeo,
  NextSeoProps,
  VideoGameJsonLd,
  VideoGameJsonLdProps,
} from 'next-seo';
import {
  DeveloperSchema,
  SerializableGameSchema,
} from '@worksheets/util/types';
import { GetServerSideProps } from 'next';
import { gameJsonLd, gameSeo } from '../../util/seo';
import dynamic from 'next/dynamic';
import { AdsensePushScript } from '../../scripts';

type Props = {
  game: SerializableGameSchema;
  seo: NextSeoProps;
  jsonLd: VideoGameJsonLdProps;
  items: MixedGridItem[];
  developer: DeveloperSchema;
  randomGame: string;
};

const DynamicGameLauncher = dynamic(() => import('../../dynamic/launcher'), {
  ssr: false,
});

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
      <GameScreen
        game={<DynamicGameLauncher game={game} developer={developer} />}
        description={
          <GameDescription
            gameId={game.id}
            title={game.name}
            developer={developer}
            platforms={game.platforms}
            tags={game.tags}
            category={game.category}
            created={game.createdAt}
            updated={game.updatedAt}
            text={game.description}
            markets={game.markets}
          />
        }
        suggestions={[
          {
            href: `/play/${randomGame}`,
            type: 'button',
            text: {
              content: 'Random Game',
              color: 'text.primary',
              variant: 'h4',
            },
            backgroundColor: 'highlight.main',

            width: { xs: '1/-1' },
            Icon: ShuffleIcon,
          },
          ...items,
          {
            type: 'button',
            text: {
              content: 'More Games',
              color: 'error.contrastText',
              variant: 'h4',
            },
            backgroundColor: 'error.main',
            href: '/play',
            Icon: SportsEsportsOutlinedIcon,
            width: { xs: '1/-1', sm: `span 3` },
          },
          {
            type: 'button',
            text: {
              content: 'All Tags',
              color: 'primary.contrastText',
              variant: 'h4',
            },
            backgroundColor: 'primary.main',
            href: '/tags',
            Icon: LocalOfferOutlinedIcon,
            width: { xs: '1/-1', sm: `span 3` },
          },
        ]}
      />
      <VideoGameJsonLd {...jsonLd} />
      <AdsensePushScript />
    </>
  );
};

export const getServerSideProps = (async ({ params }) => {
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
        updatedAt: printDate(game.updatedAt),
        createdAt: printDate(game.createdAt),
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
