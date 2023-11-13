import { Box } from '@mui/material';
import { TeamCard } from '@worksheets/ui-charity';
import { trpc } from '@worksheets/trpc-charity';

export const MyTeamsContainer = () => {
  const teams = trpc.teams.list.useQuery();

  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {teams.data?.map((team) => (
        <TeamCard
          key={team.id}
          name={team.name}
          id={team.id}
          description={team.description}
          subdomain={team.subdomain}
          games={team.games.length}
          members={team.memberships.length}
        />
      ))}
    </Box>
  );
};
