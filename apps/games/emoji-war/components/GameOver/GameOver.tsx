import { Paper, Typography, Button, Box } from '@mui/material';
import { Flex } from '@worksheets/ui-core';
import { FC } from 'react';

export const GameOverOverlay: FC<{
  winner: number;
  player: string;
  enemy: string;
  onRematch: () => void;
  onReturnToMenu: () => void;
}> = ({ winner, player, enemy, onRematch, onReturnToMenu }) => {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={100}
      sx={{
        backdropFilter: 'blur(2px)',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <Paper
        sx={{
          borderRadius: 4,
          border: '2px solid black',
        }}
      >
        <Box mt={2} mb={4} mx={6}>
          <Flex column centered gap={1}>
            <Typography variant="h4">
              {winner === 1 ? 'Victory' : 'Defeat'}
            </Typography>
            <Typography>{winner === 1 ? 'You Win!' : 'You Lose!'}</Typography>
            <Box my={3}>
              <Typography fontSize={64}>
                {winner === 1 ? player : enemy}
              </Typography>
            </Box>
            <Button
              variant="contained"
              disableElevation
              onClick={onReturnToMenu}
            >
              Menu
            </Button>
            <Button variant="outlined" onClick={onRematch}>
              Rematch
            </Button>
          </Flex>
        </Box>
      </Paper>
    </Box>
  );
};
