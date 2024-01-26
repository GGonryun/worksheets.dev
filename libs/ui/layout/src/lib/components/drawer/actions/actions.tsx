import { LocalOffer, SportsEsports } from '@mui/icons-material';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { ShuffleIcon } from '@worksheets/icons/native';
import { FC } from 'react';

export const Actions: FC = () => {
  return (
    <Box mt={4} display="flex" gap={2} flexDirection="column">
      <Button
        variant="arcade"
        fullWidth
        size="large"
        href="/play"
        color="success"
        startIcon={<SportsEsports />}
      >
        All Games
      </Button>
      <Button
        variant="arcade"
        fullWidth
        size="large"
        href="/tags"
        color="error"
        startIcon={<LocalOffer />}
      >
        All Categories
      </Button>
      <Button
        href="/play/random"
        variant="arcade"
        fullWidth
        size="large"
        color="warning"
        startIcon={<ShuffleIcon size={20} />}
      >
        Random Game
      </Button>
    </Box>
  );
};
