import { Box, Paper } from '@mui/material';
import { RaffleSchema } from '@worksheets/util/types';
import React, { ReactNode } from 'react';

import {
  BottomPunchOut,
  LeftPunchOut,
  RightPunchOut,
  TopPunchOut,
} from '../punch-outs';
import { RaffleHeader } from './raffle-header';
import { RaffleInfo } from './raffle-info';

export const RaffleDetails: React.FC<{
  raffle: RaffleSchema;
  raffleEntry: React.ReactNode;
  onShare: () => void;
}> = ({ raffle, raffleEntry, onShare }) => (
  <Paper
    elevation={10}
    sx={{
      p: { xs: 2, sm: 3 },
      backgroundColor: (theme) => theme.palette.background['solid-blue'],
    }}
  >
    <Paper
      elevation={0}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '100%', desktop1: '60% 40%' },
        gridTemplateRows: { xs: 'auto auto', desktop1: 'auto' },
      }}
    >
      <Box textAlign="center">
        <RaffleHeader raffle={raffle} />
      </Box>
      <TicketBox>
        <RaffleInfo
          raffle={raffle}
          raffleEntry={raffleEntry}
          onShare={onShare}
        />
      </TicketBox>
    </Paper>
  </Paper>
);

const TicketBox: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        // https://kovart.github.io/dashed-border-generator/
        borderImageSource: (theme) =>
          `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='${theme.palette.divider}' stroke-width='4' stroke-dasharray='6%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
        // https://stackoverflow.com/questions/2771171/control-the-dashed-border-stroke-length-and-distance-between-strokes
        borderImageWidth: 1,
        borderImageSlice: 2,
        borderImageRepeat: 'round',
        borderLeft: { xs: 'none', desktop1: `dashed 4px #000` },
        borderTop: { xs: `dashed 4px #000`, desktop1: 'none' },
      }}
    >
      <TopPunchOut
        sx={{
          display: { xs: 'none', desktop1: 'block' },
        }}
      />
      <BottomPunchOut
        sx={{
          display: { xs: 'none', desktop1: 'block' },
        }}
      />
      <LeftPunchOut
        sx={{
          display: { xs: 'block', desktop1: 'none' },
        }}
      />
      <RightPunchOut
        sx={{
          display: { xs: 'block', desktop1: 'none' },
        }}
      />
      {children}
    </Box>
  );
};
