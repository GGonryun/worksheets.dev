import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { useRouter } from 'next/router';

import GameScreenContainer from './game-screen-container';
const FallbackGameScreenContainer = () => {
  const router = useRouter();
  const gameId = router.query.gameId as string;
  const options = { enabled: !!gameId };
  const game = trpc.public.games.find.useQuery({ id: gameId }, options);

  const team = trpc.public.games.team.find.useQuery({ gameId }, options);

  if (game.isPending || team.isPending) {
    return <LoadingScreen />;
  }

  if (game.isError || team.isError) {
    return (
      <ErrorScreen
        message={parseTRPCClientErrorMessage(game.error || team.error)}
      />
    );
  }

  return <GameScreenContainer game={game.data} team={team.data} />;
};

export default FallbackGameScreenContainer;
