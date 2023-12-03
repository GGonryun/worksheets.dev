import {
  GameDescription,
  GameLauncher,
  GameScreen,
  MixedGridItem,
} from '@worksheets/ui-charity';
import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { mixedItems } from '../../util/mixed-items';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { printDate } from '@worksheets/util/time';
import { AbsolutelyCentered } from '@worksheets/ui-core';
import { developers, games } from '@worksheets/data-access/charity-games';

const Page: NextPageWithLayout = () => {
  const { query } = useRouter();
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

  return (
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
      suggestions={mixedItems({
        hideAds: true,
      }).map(shrinkGames)}
    />
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

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
