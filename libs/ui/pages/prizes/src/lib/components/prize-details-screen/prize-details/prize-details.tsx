import { Box, Paper } from '@mui/material';
import { PrizeSchema } from '@worksheets/util/types';

import {
  BottomPunchOut,
  LeftPunchOut,
  RightPunchOut,
  TopPunchOut,
} from '../punch-outs';
import { PrizeHeader } from './prize-header';
import { RaffleInfo } from './raffle-info';

export const PrizeDetails: React.FC<PrizeSchema> = ({
  headline,
  expires,
  imageUrl,
  title,
  tokens,
  entered,
  value,
}) => (
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
        gridTemplateColumns: { xs: '100%', sm: '65% 35%' },
        gridTemplateRows: { xs: 'auto auto', sm: 'auto' },
      }}
    >
      <Box textAlign="center">
        <PrizeHeader title={title} imageUrl={imageUrl} headline={headline} />
      </Box>
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
          borderLeft: { xs: 'none', sm: `dashed 4px #000` },
          borderTop: { xs: `dashed 4px #000`, sm: 'none' },
        }}
      >
        <TopPunchOut
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        />
        <BottomPunchOut
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        />
        <LeftPunchOut
          sx={{
            display: { xs: 'block', sm: 'none' },
          }}
        />
        <RightPunchOut
          sx={{
            display: { xs: 'block', sm: 'none' },
          }}
        />
        <RaffleInfo
          tokens={tokens}
          value={value}
          expires={expires}
          entered={entered}
        />
      </Box>
    </Paper>
  </Paper>
);
