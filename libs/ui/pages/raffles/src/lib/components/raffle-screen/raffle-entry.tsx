import {
  Check,
  LocalActivityOutlined,
  Login,
  OpenInNew,
} from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { PulsingLogo } from '@worksheets/ui/components/loading';
import { RaffleSchema } from '@worksheets/util/types';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import React from 'react';

import { SectionHeaderTypography } from './section-header-typography';

export const RaffleEntry: React.FC<{
  raffle: RaffleSchema;
  onEnter: () => void;
}> = ({ raffle, onEnter }) => {
  const isExpired = raffle.expiresAt < Date.now();
  const loginHref = routes.login.path({
    query: {
      redirect: routes.raffle.path({
        params: { raffleId: raffle.id },
      }),
    },
  });

  const { push } = useRouter();
  const session = useSession();
  const isConnected = session.status === 'authenticated';

  const participation = trpc.user.raffles.participation.useQuery(
    {
      raffleId: raffle.id,
    },
    {
      enabled: isConnected,
    }
  );

  const handleRaffleClick = () => {
    if (!isConnected) {
      push(loginHref);
      return;
    }

    if (isExpired) return;

    onEnter();
  };

  if (session.status === 'loading' || (isConnected && participation.isPending))
    return <PulsingLogo />;
  if (participation.isError) return <Typography>Error...</Typography>;

  return (
    <>
      <EntrySection entries={participation.data?.numEntries ?? 0} />
      <Divider />

      <Box display="flex" flexDirection="column" gap={1} mt={1}>
        <Button
          variant="arcade"
          color={isConnected ? 'secondary' : 'warning'}
          fullWidth
          disabled={isConnected && isExpired}
          sx={{ px: 1 }}
          onClick={handleRaffleClick}
          startIcon={
            isConnected ? (
              isExpired ? (
                <Check />
              ) : (
                <LocalActivityOutlined />
              )
            ) : (
              <Login />
            )
          }
        >
          {isConnected
            ? isExpired
              ? 'Raffle Over!'
              : 'Enter Raffle'
            : `Login${isExpired ? ' To View' : ' To Participate'}`}
        </Button>
        <Button
          variant="arcade"
          color="primary"
          fullWidth
          sx={{ px: 1 }}
          href={routes.help.path()}
          target="_blank"
          startIcon={<OpenInNew />}
        >
          Learn More
        </Button>
      </Box>
    </>
  );
};

const EntrySection: React.FC<{ entries: number }> = ({ entries }) => (
  <Box display="flex">
    <Box width="50%">
      <SectionHeaderTypography>Your Entries</SectionHeaderTypography>
      <Typography fontWeight={700}>{entries}</Typography>
    </Box>
    <Box width="50%">
      <SectionHeaderTypography>Total Winners</SectionHeaderTypography>
      <Typography fontWeight={700}>1</Typography>
    </Box>
  </Box>
);
