import { NewReleases } from '@mui/icons-material';
import { Box, Link, List, ListItem, Typography } from '@mui/material';
import { GamePlayerSchema } from '@worksheets/util/types';
import { FC } from 'react';

export const TopPlayers: FC<{ players: GamePlayerSchema[] }> = ({
  players,
}) => {
  return (
    <Box mt={2}>
      <Typography variant="h4">Top Players</Typography>
      {players.length === 0 && <NoPlayersPlaceholder />}
      <List>
        {players.map((player, index) => (
          <ListItem
            key={player.id}
            sx={{
              padding: (theme) => theme.spacing(0, 2),
            }}
          >
            <Typography>
              {index + 1}.{' '}
              <Link href={`/players/${player.id}`}>{player.name}</Link> —{' '}
              {player.plays} plays
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export const NoPlayersPlaceholder = () => (
  <Box
    display="flex"
    alignItems="center"
    gap={1}
    pt={2}
    flexDirection={{ xs: 'column', sm: 'row' }}
  >
    <NewReleases sx={{ fontSize: 48 }} />
    <Box>
      <Typography variant="body1" fontWeight={700}>
        This game is brand new!
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Be the first to play, rate, and review this game.
      </Typography>
    </Box>
  </Box>
);
