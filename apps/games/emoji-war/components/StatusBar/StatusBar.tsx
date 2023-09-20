import { FC } from 'react';
import { Timer } from './Timer';
import { FightBanner } from './FightBanner';
import { Flex } from '@worksheets/ui-core';
import { Box, IconButton } from '@mui/material';
import { Logout } from '@mui/icons-material';

export const StatusBar: FC<{
  emojis: string[];
  timer: number;
  onExitGame: () => void;
}> = ({ timer, emojis, onExitGame }) => {
  return (
    <Flex spaceBetween px={2} sx={{ position: 'relative' }}>
      <Timer value={timer} />
      <IconButton size="small" sx={{ zIndex: 10 }} onClick={onExitGame}>
        <Logout />
      </IconButton>
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
