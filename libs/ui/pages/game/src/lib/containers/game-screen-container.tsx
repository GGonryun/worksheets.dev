import { ReportReason } from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { useGameVotes } from '@worksheets/ui/hooks/use-game-votes';
import { useRecentlyPlayedGames } from '@worksheets/ui/hooks/use-recently-played-games';
import { MS_TO_S } from '@worksheets/util/time';
import { NO_REFETCH } from '@worksheets/util/trpc';
import {
  DeveloperSchema,
  SerializableGameSchema,
  Vote,
} from '@worksheets/util/types';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import {
  CannotVoteModal,
  GameLauncher,
  GameScreen,
  ReportIssueModal,
  ShareGameModal,
} from '../components';
import {
  GameNotificationContextProvider,
  useGameNotifications,
} from '../hooks/use-game-notifications';
import { useGameTracker } from '../hooks/use-game-tracker';

type GameScreenContainerProps = {
  game: SerializableGameSchema;
  developer: DeveloperSchema;
};

const GameScreenContainer: React.FC<GameScreenContainerProps> = ({
  game,
  developer,
}) => {
  return (
    <GameNotificationContextProvider limit={10}>
      <GameScreenContainerInner game={game} developer={developer} />;
    </GameNotificationContextProvider>
  );
};

const GameScreenContainerInner: React.FC<GameScreenContainerProps> = ({
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
  const authenticated = session.status === 'authenticated';

  const notifications = useGameNotifications();

  const [showShare, setShowShare] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const userVotes = useGameVotes();

  const user = trpc.user.get.useQuery(undefined, {
    enabled: authenticated,
    ...NO_REFETCH,
  });
  const castVote = trpc.public.games.vote.cast.useMutation();
  const record = trpc.maybe.games.record.useMutation();
  const reportGame = trpc.public.games.report.useMutation();

  const trackGamePlay = trpc.user.gamePlay.track.useMutation();
  const trackGameTime = trpc.user.gameTime.track.useMutation();

  const { data: suggestions } = trpc.public.games.suggestions.useQuery(
    {
      gameId: game.id,
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const { addRecentlyPlayed } = useRecentlyPlayedGames();

  const [showVoteWarning, setShowVoteWarning] = useState(false);

  const gameTracker = useGameTracker(user.data, {
    onElapsed: (interval) => {
      trackGameTime.mutate({
        gameId: game.id,
        duration: MS_TO_S(interval),
      });
    },
  });

  const handleRewardPlay = async () => {
    if (user.data) {
      await trackGamePlay.mutateAsync({
        gameId: game.id,
      });
      notifications.add('You earned 1 token for starting the game!');
    } else {
      notifications.add('Login to earn tokens!', {
        color: 'warning',
        unique: true,
      });
    }
  };

  const handleIncrementPlayCount = async () => {
    await record.mutateAsync({ gameId: game.id });
  };

  const handlePlayGame = async () => {
    // TODO: when someone clicks play game start the game tracker
    gameTracker.start();
    addRecentlyPlayed({
      id: game.id,
      title: game.name,
      thumbnail: game.iconUrl,
      plays: game.plays,
      playedLast: new Date().getTime(),
    });

    await Promise.all([handleRewardPlay(), handleIncrementPlayCount()]);
  };

  const handleReportGame = async (reason: ReportReason, text: string) => {
    reportGame.mutateAsync({
      gameId: game.id,
      reason,
      text,
    });
  };

  const handleMakeVote = async (newVote: Vote) => {
    if (!authenticated) {
      setShowVoteWarning(true);
      return;
    }

    const currentVote = userVotes.getVote(game.id);

    await castVote.mutateAsync({
      gameId: game.id,
      currentVote: currentVote?.vote,
      newVote,
    });

    userVotes.addGameVote({
      gameId: game.id,
      vote: newVote,
    });
  };

  return (
    <>
      <GameScreen
        suggestions={suggestions ?? []}
        game={game}
        developer={developer}
        onShare={() => setShowShare(true)}
        onReport={() => setShowReport(true)}
        launcher={
          <GameLauncher
            game={game}
            developer={developer}
            userVote={userVotes.getVote(game.id)?.vote}
            onPlay={handlePlayGame}
            onVote={handleMakeVote}
          />
        }
      />
      <CannotVoteModal
        href={loginHref}
        open={showVoteWarning}
        onClose={() => setShowVoteWarning(false)}
      />
      <ShareGameModal
        open={showShare}
        onClose={() => setShowShare(false)}
        id={game.id}
        name={game.name}
      />
      <ReportIssueModal
        open={showReport}
        onClose={() => setShowReport(false)}
        onReport={handleReportGame}
      />
    </>
  );
};

export default GameScreenContainer;
