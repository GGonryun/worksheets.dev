import { ArrowForward, HelpCenter, HowToVote } from '@mui/icons-material';
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
}> = ({ prizeName, activeRaffles, expiredRaffles }) => {
  activeRaffles.sort((a, b) => a.expiresAt - b.expiresAt);
  expiredRaffles.sort((a, b) => b.expiresAt - a.expiresAt);
  return (
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
          {activeRaffles.length < 1 && expiredRaffles.length < 1 ? (
            <Box>
              <Typography variant="h6">No raffle history</Typography>
              <Typography>
                Check back later for raffles on this prize!
              </Typography>
              <Button
                variant="arcade"
                href="/raffles"
                color="error"
                sx={{ mt: 2 }}
                endIcon={<ArrowForward />}
              >
                Find active raffles
              </Button>
            </Box>
          ) : (
            <>
              <Typography variant="h6">Active Raffles</Typography>
              {activeRaffles.length > 0 ? (
                <>
                  <RafflePseudoGridHeader active />
                  {activeRaffles.map((raffle) => (
                    <RafflePseudoGridRow
                      key={raffle.id}
                      raffle={raffle}
                      active
                    />
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
            </>
          )}
        </Box>
      }
    />
  );
};
export const RafflePseudoGridHeader: React.FC<{ active?: boolean }> = ({
  active,
}) => (
  <Box
    pt={1}
    display="grid"
    gridTemplateColumns={{ xs: '1fr 1fr 2fr', sm: '1fr 1fr 3fr' }}
    gap={2}
    flexDirection="row"
    alignItems="center"
  >
    <Typography fontWeight={700}>ID</Typography>
    <Typography fontWeight={700}>Type</Typography>
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
    gridTemplateColumns={{ xs: '1fr 1fr 2fr', sm: '1fr 1fr 3fr' }}
    gap={2}
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
    <Typography
      variant="body2"
      sx={{
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {raffle.id}
    </Typography>
    <Typography textTransform="capitalize">
      {raffle.type.split('_').join(' ').toLowerCase()}
    </Typography>
    <Typography variant="body2">
      {active
        ? `${durationToString(
            millisecondsAsDuration(raffle.expiresAt - Date.now())
          )}`
        : printShortDateTime(raffle.expiresAt)}
    </Typography>
  </Box>
);
