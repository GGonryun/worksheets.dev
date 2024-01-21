import { AccessTime, LocalActivity, Share } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';
import { ColoredSteamGames } from '@worksheets/icons/companies';
import { daysFromNow, printTimeRemaining } from '@worksheets/util/time';
import React, { JSXElementConstructor } from 'react';

export const RaffleInfo: React.FC<{
  expires: number;
  tokens: number;
  entered: number;
  value: number;
}> = ({ expires, entered, tokens, value }) => {
  const soon = expires < daysFromNow(1).getTime();
  const expired = expires < Date.now();

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
        <Box position="absolute" right={8} top={8}>
          <Button variant="square" size="small">
            <Share fontSize="small" />
          </Button>
        </Box>
        {/* displace the button height */}
        <Box py={{ xs: 0, sm: 2 }} />
        <Box>
          <SectionHeaderTypography>
            {expired ? 'Raffle Over!' : 'Raffle Ends In'}
          </SectionHeaderTypography>
          <Box display="flex" gap={1} alignItems="center">
            <AccessTime color="action" />
            <Typography
              variant="h6"
              fontWeight={900}
              color={soon ? 'primary.main' : 'text.primary'}
            >
              {printTimeRemaining(expires)}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <PrizeType />
        <Divider />
        <PrizeValueSection value={value} />
        <Divider />
        <EntryFeeSection tokens={tokens} entered={entered} />
        <Divider />

        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <Button
            size="small"
            variant="arcade"
            color="success"
            fullWidth
            disabled={expired}
            sx={{ px: 1 }}
            startIcon={
              <LocalActivity sx={{ height: '1.5rem', width: '1.5rem' }} />
            }
          >
            Enter Raffle
          </Button>
          <Button
            size="small"
            variant="arcade"
            color="primary"
            fullWidth
            sx={{ px: 1 }}
            startIcon={
              <ColoredSteamGames
                sx={{
                  height: 28,
                  width: 28,
                }}
              />
            }
          >
            Get It On Steam
          </Button>
        </Box>
        <Box my={1.5} />
      </Box>
    </Box>
  );
};

const PrizeType: React.FC = () => (
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
      <Typography variant="h6">Steam Key</Typography>
    </Box>
  </Box>
);

const SectionHeaderTypography = styled<JSXElementConstructor<TypographyProps>>(
  (props) => (
    <Typography
      variant="body3"
      fontWeight={500}
      textTransform="uppercase"
      {...props}
    />
  )
)();

const PrizeValueSection: React.FC<{ value: number }> = ({ value }) => (
  <Box display="flex">
    <Box width="50%">
      <SectionHeaderTypography>Prize Value</SectionHeaderTypography>
      <Typography fontWeight={700}>${value}</Typography>
    </Box>
    <Box width="50%">
      <SectionHeaderTypography>You Pay</SectionHeaderTypography>
      <Typography color="success.main" fontWeight={700}>
        $0
      </Typography>
    </Box>
  </Box>
);

const EntryFeeSection: React.FC<{ tokens: number; entered: number }> = ({
  tokens,
  entered,
}) => (
  <Box display="flex">
    <Box width="50%">
      <SectionHeaderTypography>Entry Fee</SectionHeaderTypography>
      <Typography fontWeight={700}>{tokens} Tokens</Typography>
    </Box>
    <Box width="50%">
      <SectionHeaderTypography>Your Entries</SectionHeaderTypography>
      <Typography
        fontWeight={700}
        color={entered ? 'success.main' : 'text.primary'}
      >
        {entered}
      </Typography>
    </Box>
  </Box>
);
