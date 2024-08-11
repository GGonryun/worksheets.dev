import { AccessAlarms } from '@mui/icons-material';
import { Box, LinearProgress, Typography } from '@mui/material';
import { Row } from '@worksheets/ui/components/flex';
import { printShortDateTime } from '@worksheets/util/time';

import { useTimeToUtcMidnight } from './hooks/use-time-to-midnight';

export const DealCountdown = () => {
  const timeRemaining = useTimeToUtcMidnight();
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  return (
    <Box>
      <Row gap={1} mb={1}>
        <AccessAlarms />
        <Typography
          typography="body3"
          fontWeight={900}
          textTransform={'uppercase'}
        >
          This Deal Ends: {printShortDateTime(timeRemaining.utc)}
        </Typography>
      </Row>
      <Box position="relative">
        <LinearProgress
          variant="determinate"
          color="error"
          value={(timeRemaining.number / ONE_DAY_MS) * 100}
          sx={{
            height: 24,
            borderRadius: (theme) => theme.shape.borderRadius,
          }}
        />
        <Typography
          position="absolute"
          display="grid"
          justifySelf="center"
          alignSelf="center"
          top={0}
          left={0}
          right={0}
          bottom={0}
          lineHeight={1}
          margin="auto"
          color={'text.arcade'}
          sx={{
            WebkitTextStroke: '1px',
            WebkitTextStrokeColor: 'black',
          }}
          textAlign="center"
          fontWeight={900}
        >
          {timeRemaining.string.toUpperCase()}
        </Typography>
      </Box>
    </Box>
  );
};
