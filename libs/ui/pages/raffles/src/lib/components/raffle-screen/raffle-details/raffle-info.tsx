import {
  AccessTime,
  Check,
  LocalActivity,
  Login,
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
import { PrizeType } from '@prisma/client';
import { ColoredSteamGames } from '@worksheets/icons/companies';
import {
  prizeTypeActionLabel,
  prizeTypeLabel,
  prizeTypeLogos,
} from '@worksheets/ui/components/prizes';
import { PrizesPanels } from '@worksheets/util/enums';
import {
  daysFromNow,
  durationToString,
  millisecondsAsDuration,
  printShortDateTime,
} from '@worksheets/util/time';
import React, { JSXElementConstructor } from 'react';

export const RaffleInfo: React.FC<{
  id: string;
  prizeId: string;
  expiresAt: number;
  costPerEntry: number;
  yourEntries: number;
  numWinners: number;
  monetaryValue: number;
  connected: boolean;
  type: PrizeType;
  sourceUrl: string;
  youWon: boolean;
  onRaffleClick: () => void;
  onShare: () => void;
}> = ({
  id,
  sourceUrl,
  expiresAt,
  numWinners,
  yourEntries,
  costPerEntry,
  type,
  monetaryValue,
  connected,
  youWon,
  onRaffleClick,
  onShare,
}) => {
  const soon = expiresAt < daysFromNow(1).getTime();
  const expired = expiresAt < Date.now();

  const PlatformLogo = prizeTypeLogos[type];
  const loginHref = `/login?redirect=${encodeURIComponent(`/raffles/${id}`)}`;
  const accountHref = `/account/prizes#${PrizesPanels.Prizes}`;

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
        <Box py={{ xs: 0, sm: 2 }} />
        <Box>
          <SectionHeaderTypography>
            {expired ? 'Raffle Over!' : 'Raffle Ends In'}
          </SectionHeaderTypography>
          <Box display="flex" gap={1} alignItems="center" pt={0.5}>
            <AccessTime
              color={youWon ? 'success' : expired ? 'error' : 'action'}
            />
            <Typography
              typography={expired ? 'body2' : 'h6'}
              fontWeight={{ xs: 700, sm: 700 }}
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
        <PrizeValueSection winners={numWinners} value={monetaryValue} />
        <Divider />
        <EntryFeeSection cost={costPerEntry} entered={yourEntries} />
        <Divider />

        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <Button
            size="small"
            variant="arcade"
            color={youWon ? 'success' : connected ? 'secondary' : 'warning'}
            fullWidth
            disabled={expired && !youWon}
            sx={{ px: 1 }}
            onClick={youWon || !connected ? undefined : onRaffleClick}
            href={youWon ? accountHref : !connected ? loginHref : undefined}
            startIcon={
              expired ? (
                <Check sx={{ height: '1.5rem', width: '1.5rem' }} />
              ) : connected ? (
                <LocalActivity sx={{ height: '1.5rem', width: '1.5rem' }} />
              ) : (
                <Login sx={{ height: '1.5rem', width: '1.5rem' }} />
              )
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
            size="small"
            variant="arcade"
            color="primary"
            fullWidth
            sx={{ px: 1 }}
            href={sourceUrl}
            target="_blank"
            startIcon={
              <PlatformLogo sx={{ height: '1.5rem', width: '1.5rem' }} />
            }
          >
            {prizeTypeActionLabel[type]}
          </Button>
        </Box>
        <Box my={1.5} />
      </Box>
    </Box>
  );
};

const PrizeTypeInfo: React.FC<{ type: PrizeType }> = ({ type }) => (
  <Box>
    <SectionHeaderTypography>Prize Type</SectionHeaderTypography>
    <Box
      pt={0.5}
      display="flex"
      justifyContent="center"
      gap={1}
      alignItems="center"
    >
      <ColoredSteamGames fontSize="large" />
      <Typography variant="h6">{prizeTypeLabel[type]}</Typography>
    </Box>
  </Box>
);

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

const PrizeValueSection: React.FC<{ winners: number; value: number }> = ({
  winners,
  value,
}) => (
  <Box display="flex">
    <Box width="50%">
      <SectionHeaderTypography>Winners</SectionHeaderTypography>
      <Typography fontWeight={700}>{winners}</Typography>
    </Box>
    <Box width="50%">
      <SectionHeaderTypography>Prize Value</SectionHeaderTypography>
      <Typography fontWeight={700}>${value}</Typography>
    </Box>
  </Box>
);

const EntryFeeSection: React.FC<{ cost: number; entered: number }> = ({
  cost,
  entered,
}) => (
  <Box display="flex">
    <Box width="50%">
      <SectionHeaderTypography>Entry Fee</SectionHeaderTypography>
      <Typography fontWeight={700}>{cost} Tokens</Typography>
    </Box>
    <Box width="50%">
      <Typography
        component={'a'}
        variant="body3"
        fontWeight={500}
        textTransform="uppercase"
        color="text.primary"
        href={`/account/prizes#${PrizesPanels.Raffles}`}
      >
        Your Entries
      </Typography>
      <Typography
        fontWeight={700}
        color={entered ? 'success.main' : 'text.primary'}
      >
        {entered}
      </Typography>
    </Box>
  </Box>
);
