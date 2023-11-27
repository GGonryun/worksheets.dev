import {
  GameDescription,
  GameLauncher,
  GameScreen,
  developers,
  games,
} from '@worksheets/ui-charity';
import { NextPageWithLayout } from '@worksheets/util-next';
import { LayoutContainer } from '../../containers/layout-container';
import { mixedItems } from '../../util/mixed-items';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { printDate } from '@worksheets/util/time';

const Page: NextPageWithLayout = () => {
  const { push, query } = useRouter();
  const gameId = query.gameId as string;
  const game = games.find((game) => game.id === gameId);
  const developer = developers.find(
    (developer) => developer.id === game?.developerId
  );

  if (!game || !developer) return <CircularProgress />;

  const handleOnPlay = () => {
    if (game.file.type === 'redirect') {
      push(game.file.url);
    } else {
      alert('TODO: show iframe');
    }
  };

  const handleRedirect = () => {
    if (game.file.type === 'redirect') {
      push(game.file.url);
    } else {
      alert("Unsupported action: game.file.type !== 'redirect'");
    }
  };

  const handleReportBug = () => {
    // TODO: improve bug handling
    alert('Our development team has been notified. Thank you!');
  };

  const handleEnterFullscreen = () => {
    if (game.file.type === 'redirect') {
      alert("Unsupported action: game.file.type !== 'iframe'");
    } else {
      alert('TODO: enter fullscreen');
    }
  };

  const handleExitFullscreen = () => {
    if (game.file.type === 'redirect') {
      alert("Unsupported action: game.file.type !== 'iframe'");
    } else {
      alert('TODO: exit fullscreen');
    }
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
          onReportBug={handleReportBug}
          onEnterFullscreen={handleEnterFullscreen}
          onExitFullscreen={handleExitFullscreen}
          onRedirect={handleRedirect}
          onPlay={handleOnPlay}
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
      suggestions={mixedItems().map((item) => ({ ...item, span: 1 }))}
    />
  );
};

Page.getLayout = (page) => {
  return <LayoutContainer>{page}</LayoutContainer>;
};

export default Page;
