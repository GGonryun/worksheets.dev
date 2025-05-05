import { Box, Container, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import {
  ArcadeItemGroup,
  ArcadeItemLayout,
} from '@worksheets/ui/components/arcade';
import { ErrorScreen } from '@worksheets/ui/pages/errors';
import { LoadingScreen } from '@worksheets/ui/pages/loading';
import { shorthandNumber } from '@worksheets/util/numbers';
import { parseTRPCClientErrorMessage } from '@worksheets/util/trpc';

export const TeamsScreenContainer = () => {
  const teams = trpc.public.teams.list.useQuery();
  if (teams.isPending) return <LoadingScreen />;
  if (teams.isError)
    return <ErrorScreen message={parseTRPCClientErrorMessage(teams.error)} />;

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box>
        <Typography variant="h4" mb={0.5}>
          Teams
        </Typography>
        <ArcadeItemGroup
          pageSize={20}
          title={'Teams'}
          items={teams.data}
          render={(team) => (
            <ArcadeItemLayout
              key={team.id}
              href={routes.team.url({
                params: { teamId: team.id },
              })}
              name={team.name}
              caption={team.games ? `${shorthandNumber(team.games)} games` : ''}
              imageUrl={team.logo}
            />
          )}
        />
      </Box>
    </Container>
  );
};
