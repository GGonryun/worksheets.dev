import { trpc } from '@worksheets/trpc-charity';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';
import { useRouter } from 'next/router';

import { TeamScreen } from '../components';

export const TeamScreenContainer = () => {
  const router = useRouter();
  const id = router.query.teamId as string;
  const query = { id };
  const options = { enabled: !!id };
  const team = trpc.public.teams.find.useQuery(query, options);
  const games = trpc.public.teams.games.list.useQuery(query, options);

  if (team.isPending || games.isPending) {
    return <LoadingScreen />;
  }

  if (team.isError || games.isError) {
    return (
      <ErrorScreen
        message={parseTRPCClientErrorMessage(team.error || games.error || '')}
      />
    );
  }

  return <TeamScreen team={team.data} games={games.data} />;
};
