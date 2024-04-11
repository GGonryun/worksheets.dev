import {
  AccessTime,
  Check,
  LocalActivity,
  Login,
  OpenInNew,
  Share,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';
import { PrizeType } from '@worksheets/prisma';
import {
  prizeTypeActionLabel,
  prizeTypeLabel,
  prizeTypeLogos,
} from '@worksheets/ui/components/prizes';
import {
  daysFromNow,
  durationToString,
  millisecondsAsDuration,
  printShortDateTime,
} from '@worksheets/util/time';
import {
  ParticipationSchema,
  RaffleSchema,
  WinnerSchema,
} from '@worksheets/util/types';
import React, { JSXElementConstructor } from 'react';

export const RaffleInfo: React.FC<{
  raffle: RaffleSchema;
  participation?: ParticipationSchema;
  winners: WinnerSchema[];
  onRaffleClick: () => void;
  onShare: () => void;
}> = ({ participation, raffle, winners, onRaffleClick, onShare }) => {
  const { numWinners, type, expiresAt, sourceUrl } = raffle;
  const soon = expiresAt < daysFromNow(1).getTime();
  const expired = expiresAt < Date.now();

  const connected = participation !== undefined;
  const yourEntries = participation?.numEntries ?? 0;
  const youWon =
    connected && winners.some((w) => w.userId === participation?.userId);

  return (
    <Box
      height="100%"
      width="100%"
      position="relative"
      sx={{ display: 'grid', placeItems: 'center' }}
    >
      <Box
        height="95%"
        width="85%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap={1}
      >
        <Box
          display={!expired ? 'block' : 'none'}
          position="absolute"
          right={8}
          top={8}
        >
          <Button variant="square" size="small" onClick={onShare}>
            <Share fontSize="small" />
          </Button>
        </Box>
        {/* displace the button height */}
        <Box py={2} />
        <Box>
          <SectionHeaderTypography>
            {expired ? 'Raffle Complete' : 'Raffle Ends In'}
          </SectionHeaderTypography>
          <Box display="flex" gap={1} alignItems="center" pt={0.5}>
            <AccessTime
              color={youWon ? 'success' : expired ? 'error' : 'action'}
            />
            <Typography
              typography="h6"
              color={
                youWon
                  ? 'success.main'
                  : expired
                  ? 'error.main'
                  : soon
                  ? 'primary.main'
                  : 'text.primary'
              }
            >
              {expired
                ? printShortDateTime(expiresAt)
                : durationToString(
                    millisecondsAsDuration(expiresAt - Date.now())
                  )}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <PrizeTypeInfo type={type} />
        <Divider />
        <EntrySection winners={numWinners} entries={yourEntries} />
        <Divider />

        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <Button
            variant="arcade"
            color={youWon ? 'success' : connected ? 'secondary' : 'warning'}
            fullWidth
            disabled={expired && !youWon}
            sx={{ px: 1 }}
            onClick={onRaffleClick}
            startIcon={
              expired ? <Check /> : connected ? <LocalActivity /> : <Login />
            }
          >
            {youWon
              ? 'View Prize'
              : expired
              ? 'Raffle Over!'
              : connected
              ? 'Enter Raffle'
              : 'Login To Participate'}
          </Button>
          <Button
            variant="arcade"
            color="primary"
            fullWidth
            sx={{ px: 1 }}
            href={sourceUrl}
            target="_blank"
            startIcon={<OpenInNew />}
          >
            {prizeTypeActionLabel[type]}
          </Button>
        </Box>
        <Box my={1.5} />
      </Box>
    </Box>
  );
};

const PrizeTypeInfo: React.FC<{ type: PrizeType }> = ({ type }) => {
  const Icon = prizeTypeLogos[type];
  return (
    <Box>
      <SectionHeaderTypography>Prize Type</SectionHeaderTypography>
      <Box
        pt={0.5}
        display="flex"
        justifyContent="center"
        gap={1}
        alignItems="center"
      >
        <Icon fontSize="large" />
        <Typography variant="h6">{prizeTypeLabel[type]}</Typography>
      </Box>
    </Box>
  );
};

const SectionHeaderTypography = styled<JSXElementConstructor<TypographyProps>>(
  (props) => (
    <Typography
      variant="body3"
      fontWeight={500}
      textTransform="uppercase"
      color="text.primary"
      {...props}
    />
  )
)({
  textDecorationColor: 'inherit',
});

const EntrySection: React.FC<{ winners: number; entries: number }> = ({
  winners,
  entries,
}) => (
  <Box display="flex">
    <Box width="50%">
      <SectionHeaderTypography>Your Entries</SectionHeaderTypography>
      <Typography fontWeight={700}>{entries}</Typography>
    </Box>
    <Box width="50%">
      <SectionHeaderTypography>Total Winners</SectionHeaderTypography>
      <Typography fontWeight={700}>{winners}</Typography>
    </Box>
  </Box>
);
