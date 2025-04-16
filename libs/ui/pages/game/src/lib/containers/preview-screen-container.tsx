import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { NO_REFETCH } from '@worksheets/util/trpc';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { GameLauncher, GameScreen } from '../components';
import { PreviewGameFrame } from '../components/game-launcher/game-frame/preview-game-frame';
import { PreviewModeModal } from '../components/modals/preview-mode-modal.tsx';
import { GameNotificationContextProvider } from '../hooks/use-game-notifications';
import { GameScreenContainerProps } from './game-screen-container';

const PreviewScreenContainer: React.FC<GameScreenContainerProps> = ({
  game,
  developer,
}) => {
  return (
    <GameNotificationContextProvider limit={10}>
      <PreviewScreenContainerInner game={game} developer={developer} />;
    </GameNotificationContextProvider>
  );
};

const PreviewScreenContainerInner: React.FC<GameScreenContainerProps> = ({
  game,
  developer,
}) => {
  const loginHref = routes.login.path({
    query: {
      redirect: routes.game.path({
        params: { gameId: game.id },
      }),
    },
  });

  const session = useSession();

  const [previewMode, setShowPreviewMode] = useState(false);

  const { data: suggestions } = trpc.public.games.suggestions.useQuery(
    {
      gameId: game.id,
    },
    NO_REFETCH
  );

  return (
    <>
      <GameScreen
        status={session.status}
        suggestions={suggestions ?? []}
        // preview mode should not show achievements or leaderboards
        game={{ ...game, leaderboard: false, achievements: false }}
        developer={developer}
        onShare={() => setShowPreviewMode(true)}
        onReport={() => setShowPreviewMode(true)}
        launcher={
          <GameLauncher
            frame={<PreviewGameFrame url={game.file.url} />}
            game={game}
            status={session.status}
            developer={developer}
            onVote={() => {
              setShowPreviewMode(true);
            }}
          />
        }
      />
      <PreviewModeModal
        href={loginHref}
        open={previewMode}
        onClose={() => setShowPreviewMode(false)}
      />
    </>
  );
};

export default PreviewScreenContainer;
