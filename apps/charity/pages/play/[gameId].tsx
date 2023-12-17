import { MixedGridItem } from '@worksheets/ui/game-grid';
import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { mixedItems } from '../../util/mixed-items';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { printDate } from '@worksheets/util/time';
import { AbsolutelyCentered } from '@worksheets/ui-core';
import { developers, games } from '@worksheets/data-access/charity-games';
import {
  GameDescription,
  GameLauncher,
  GameScreen,
} from '@worksheets/ui/pages/game';
import { getRandomGame } from '../../util/randomizer';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { NextSeo, VideoGameJsonLd } from 'next-seo';
import { DeveloperSchema } from '@worksheets/util/types';

const Page: NextPageWithLayout = () => {
  const { query, push } = useRouter();
  const gameId = query.gameId as string;
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

  const handleReportBug = () => {
    // TODO: improve bug handling
    alert('Our development team has been notified. Thank you!');
  };

  const items: MixedGridItem[] = [
    {
      onClick: () => {
        const randomGame = getRandomGame(true);
        push(`/play/${randomGame.id}`);
      },
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
    ...mixedItems({
      hideAds: true,
      maxGames: 50,
      maxTags: 10,
    }).map(shrinkGames),
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
  ];

  const openGraph = {
    url: `https://charity.games/play/${game.id}`,
    title: `${game.name} - Free Online Games that Support Charity`,
    description: `Want to play ${
      game.name
    }? Play this game online for free on Charity Games. ${
      game.name
    } is one of our top ${game.category} games. Supports ${game.platforms.join(
      ','
    )}.`,
    images: [
      {
        url: game.bannerUrl,
        alt: game.name,
      },
    ],
  };

  return (
    <>
      <NextSeo
        title={openGraph.title}
        description={openGraph.description}
        canonical={openGraph.url}
        openGraph={openGraph}
      />
      <GameScreen
        game={
          <GameLauncher
            backgroundUrl={game.bannerUrl}
            iconUrl={game.iconUrl}
            file={game.file}
            name={game.name}
            developer={developer.name}
            platforms={game.platforms}
            onReportBug={handleReportBug}
          />
        }
        description={
          <GameDescription
            gameId={game.id}
            title={game.name}
            developer={developer}
            platforms={game.platforms}
            tags={game.tags}
            category={game.category}
            created={printDate(game.createdAt)}
            updated={printDate(game.updatedAt)}
            text={game.description}
            markets={game.markets}
          />
        }
        suggestions={items}
      />
      <VideoGameJsonLd
        name={game.name}
        languageName={['English']}
        description={game.description}
        playMode="SinglePlayer"
        applicationCategory="Game"
        url={`https://charity.games/play/${game.id}`}
        platformName={game.platforms}
        keywords={game.tags.join(', ')}
        datePublished={game.createdAt.toISOString()}
        image={game.iconUrl}
        publisherName={developer.name}
        producerUrl={pickDeveloperSocial(developer)}
      />
    </>
  );
};

function shrinkGames(item: MixedGridItem) {
  if (item.type === 'game') {
    return {
      ...item,
      span: 1,
    };
  } else return item;
}

function pickDeveloperSocial(developer: DeveloperSchema) {
  const socials = developer.socials ?? {};
  return (
    socials.website ||
    socials.steam ||
    socials.itchio ||
    socials.facebook ||
    socials.twitter ||
    socials.instagram ||
    socials.youtube ||
    socials.twitch ||
    socials.tiktok ||
    socials.playstore ||
    socials.appstore ||
    socials.discord
  );
}

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
