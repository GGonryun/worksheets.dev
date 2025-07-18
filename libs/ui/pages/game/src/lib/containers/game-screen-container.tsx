import { ReportReason } from '@worksheets/prisma';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { useGameVotes } from '@worksheets/ui/hooks/use-game-votes';
import { useRecentlyPlayedGames } from '@worksheets/ui/hooks/use-recently-played-games';
import { NO_REFETCH } from '@worksheets/util/trpc';
import {
  SerializableGameSchema,
  TeamSchema,
  Vote,
} from '@worksheets/util/types';
import { useSession } from 'next-auth/react';
import { useCallback, useState } from 'react';

import {
  CannotVoteModal,
  GameLauncher,
  GameScreen,
  ReportIssueModal,
  ShareGameModal,
} from '../components';
import { GameFrame } from '../components/game-launcher/game-frame';
import {
  GameNotificationContextProvider,
  useGameNotifications,
} from '../hooks/use-game-notifications';

export type GameScreenContainerProps = {
  game: SerializableGameSchema;
  team: TeamSchema;
};

const GameScreenContainer: React.FC<GameScreenContainerProps> = ({
  game,
  team,
}) => {
  return (
    <GameNotificationContextProvider limit={10}>
      <GameScreenContainerInner game={game} team={team} />;
    </GameNotificationContextProvider>
  );
};

const GameScreenContainerInner: React.FC<GameScreenContainerProps> = ({
  game,
  team,
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

  const teams = trpc.user.teams.list.useQuery(undefined, {
    enabled: authenticated,
  });

  const notifications = useGameNotifications();

  const [showShare, setShowShare] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const userVotes = useGameVotes();

  const castVote = trpc.public.games.vote.cast.useMutation();
  const record = trpc.maybe.games.record.useMutation();
  const reportGame = trpc.public.games.report.useMutation();

  const trackGamePlay = trpc.user.gamePlay.track.useMutation();

  const { data: suggestions } = trpc.public.games.suggestions.useQuery(
    {
      gameId: game.id,
    },
    NO_REFETCH
  );

  const { addRecentlyPlayed } = useRecentlyPlayedGames();

  const [showVoteWarning, setShowVoteWarning] = useState(false);

  const handleRewardPlay = useCallback(async () => {
    if (authenticated) {
      await trackGamePlay.mutateAsync({
        gameId: game.id,
      });
    } else {
      notifications.add('Login to unlock all features!', {
        color: 'warning',
        unique: true,
      });
    }
  }, [authenticated, game.id, notifications, trackGamePlay]);

  const handleIncrementPlayCount = useCallback(async () => {
    await record.mutateAsync({ gameId: game.id });
  }, [game.id, record]);

  const handlePlayGame = useCallback(async () => {
    addRecentlyPlayed({
      id: game.id,
      teamId: game.teamId,
      title: game.name,
      thumbnail: game.iconUrl,
      plays: game.plays,
      playedLast: new Date().getTime(),
    });

    await Promise.all([handleRewardPlay(), handleIncrementPlayCount()]);
  }, [
    addRecentlyPlayed,
    game.iconUrl,
    game.name,
    game.plays,
    game.id,
    game.teamId,
    handleIncrementPlayCount,
    handleRewardPlay,
  ]);

  const handleReportGame = useCallback(
    async (reason: ReportReason, text: string) => {
      reportGame.mutateAsync({
        gameId: game.id,
        reason,
        text,
      });
    },
    [game.id, reportGame]
  );

  const handleMakeVote = useCallback(
    async (newVote: Vote) => {
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
    },
    [authenticated, castVote, game.id, userVotes]
  );

  return (
    <>
      <GameScreen
        status={session.status}
        suggestions={suggestions ?? []}
        hidden={!canSeeGame(game, teams.data)}
        game={game}
        onShare={() => setShowShare(true)}
        onReport={() => setShowReport(true)}
        launcher={
          <GameLauncher
            frame={
              <GameFrame
                banner={game.banner}
                gameId={game.id}
                url={game.file.url}
                status={session.status}
              />
            }
            game={game}
            status={session.status}
            team={team}
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

const canSeeGame = (
  game: SerializableGameSchema,
  teams: TeamSchema[] | undefined
) => {
  if (game.visibility === 'PUBLIC') {
    return true;
  }
  if (game.visibility === 'UNLISTED') {
    return true;
  }
  if (game.status === 'REJECTED') {
    return false;
  }

  return teams?.some((team) => team.id === game.teamId);
};

export default GameScreenContainer;
