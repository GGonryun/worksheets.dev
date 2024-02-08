import { HelpCenter, HowToVote } from '@mui/icons-material';
import { Box, Button, Link, Typography } from '@mui/material';
import { Description } from '@worksheets/ui/components/description';
import {
  durationToString,
  millisecondsAsDuration,
  printShortDateTime,
} from '@worksheets/util/time';
import { BasicRaffleDetails } from '@worksheets/util/types';

export const RafflesDescription: React.FC<{
  prizeName: string;
  activeRaffles: BasicRaffleDetails[];
  expiredRaffles: BasicRaffleDetails[];
}> = ({ prizeName, activeRaffles, expiredRaffles }) => (
  <Description
    title="Recent Raffles"
    ancillary={
      <Box
        width={{ xs: '100%', sm: 'auto' }}
        display="flex"
        gap={{ xs: 2, sm: 1.5 }}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Button
          size="small"
          variant="arcade"
          color="success"
          startIcon={<HowToVote />}
          href={
            activeRaffles.length > 0
              ? `/raffles?search=${encodeURIComponent(prizeName)}`
              : '/raffles'
          }
        >
          {activeRaffles.length > 0 ? 'Enter Raffle' : 'All Raffles'}
        </Button>
        <Button
          size="small"
          variant="arcade"
          color="warning"
          href="/help/prizes"
          startIcon={<HelpCenter />}
        >
          Get Help
        </Button>
      </Box>
    }
    description={
      <Box display="flex" flexDirection="column" textAlign="left">
        <Typography variant="h6">Active Raffles</Typography>
        {activeRaffles.length > 0 ? (
          <>
            <RafflePseudoGridHeader active />
            {activeRaffles.map((raffle) => (
              <RafflePseudoGridRow key={raffle.id} raffle={raffle} active />
            ))}
          </>
        ) : (
          <Typography>No active raffles</Typography>
        )}
        <Box my={2} />
        <Typography variant="h6">Past Raffles</Typography>
        {expiredRaffles.length > 0 ? (
          <>
            <RafflePseudoGridHeader />
            {expiredRaffles.map((raffle) => (
              <RafflePseudoGridRow key={raffle.id} raffle={raffle} />
            ))}
          </>
        ) : (
          <Typography>No past raffles</Typography>
        )}
      </Box>
    }
  />
);
export const RafflePseudoGridHeader: React.FC<{ active?: boolean }> = ({
  active,
}) => (
  <Box
    pt={1}
    display="grid"
    gridTemplateColumns="1fr 2fr"
    flexDirection="row"
    alignItems="center"
  >
    <Typography fontWeight={700}>ID</Typography>
    <Typography fontWeight={700}>
      {active ? 'Time Remaining' : 'Expired At'}
    </Typography>
  </Box>
);

export const RafflePseudoGridRow: React.FC<{
  raffle: BasicRaffleDetails;
  active?: boolean;
}> = ({ raffle, active }) => (
  <Box
    display="grid"
    gridTemplateColumns={'1fr 2fr'}
    flexDirection="row"
    alignItems="center"
    component={Link}
    href={`/raffles/${raffle.id}`}
    sx={{
      textDecoration: 'none',
      color: 'inherit',
      '&:hover': {
        textDecoration: 'underline',
      },
    }}
  >
    <Typography variant="body2">{raffle.id}</Typography>
    <Typography variant="body2">
      {active
        ? `${durationToString(
            millisecondsAsDuration(raffle.expiresAt - Date.now())
          )}`
        : printShortDateTime(raffle.expiresAt)}
    </Typography>
  </Box>
);
