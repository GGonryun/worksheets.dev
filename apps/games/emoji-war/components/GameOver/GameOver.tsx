import { Paper, Typography, Button, Box } from '@mui/material';
import { Flex, Spacing } from '@worksheets/ui-core';
import { FC } from 'react';

export const GameOverOverlay: FC<{
  onRematch: () => void;
  onReturnToMenu: () => void;
}> = ({ onRematch, onReturnToMenu }) => {
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
      <Paper>
        <Spacing top={2} bottom={4} x={6}>
          <Flex column centered gap={1}>
            <Typography variant="h4">Victory</Typography>
            <Typography>Player 1</Typography>
            <Spacing y={3}>
              <Typography fontSize={64}>💎</Typography>
            </Spacing>
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
        </Spacing>
      </Paper>
    </Box>
  );
};
