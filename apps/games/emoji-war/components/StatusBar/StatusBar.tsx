import { FC } from 'react';
import { Timer } from './Timer';
import { FightBanner } from './FightBanner';
import { Flex } from '@worksheets/ui-core';
import { Box, Button } from '@mui/material';
import { Logout } from '@mui/icons-material';

export const StatusBar: FC<{
  emojis: string[];
  timer: number;
  onExitGame: () => void;
}> = ({ timer, emojis, onExitGame }) => {
  return (
    <Flex position="relative">
      <Flex fullWidth spaceBetween px={2} pt={1}>
        <Timer value={timer} />
        <Button
          size="small"
          color="inherit"
          onClick={onExitGame}
          endIcon={<Logout />}
          sx={{
            zIndex: 10,
          }}
        >
          Exit
        </Button>
      </Flex>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FightBanner emojis={emojis} />
      </Box>
    </Flex>
  );
};
