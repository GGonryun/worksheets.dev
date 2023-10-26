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
    <Flex position="relative" sx={{ backgroundColor: '#f7baff' }}>
      <Flex fullWidth spaceBetween px={1} py={'3px'}>
        <Timer value={timer} />
        <FightBanner emojis={emojis} />

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
    </Flex>
  );
};
