import {
  LocalActivity,
  LoginOutlined,
  Star,
  VpnKeyOutlined,
} from '@mui/icons-material';
import { Button, Link, Typography } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Description } from '@worksheets/ui/components/description';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column } from '@worksheets/ui/components/flex';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { useSession } from 'next-auth/react';
import React from 'react';

import { ParticipantsTable } from './participants-table';

export const ParticipantsDescription: React.FC<{
  raffleId: number;
}> = ({ raffleId }) => {
  const session = useSession();
  const [winnersOnly, setWinnersOnly] = React.useState(false);
  const participants = trpc.maybe.raffles.participants.useQuery({
    raffleId,
  });

  const total =
    participants.data?.reduce((acc, participant) => {
      return acc + participant.numEntries;
    }, 0) ?? 0;

  return (
    <Description
      hideLogo
      open
      title="Participants & Winners"
      ancillary={
        participants.data?.some((p) => p.winner) ? (
          <Button
            variant="arcade"
            startIcon={winnersOnly ? <LocalActivity /> : <Star />}
            color={winnersOnly ? 'primary' : 'yellow'}
            sx={{
              width: { xs: '100%', sm: 'fit-content' },
              alignSelf: 'flex-end',
            }}
            onClick={() => setWinnersOnly((prev) => !prev)}
          >
            {winnersOnly ? 'Show All' : 'Show Winners Only'}
          </Button>
        ) : null
      }
      description={
        session.status === 'loading' || participants.isLoading ? (
          <LoadingBar />
        ) : participants.isError ? (
          <ErrorComponent color="text.primary" />
        ) : session.status === 'authenticated' ? (
          <ParticipantsTable
            total={total}
            participants={
              winnersOnly
                ? participants.data.filter((p) => p.winner)
                : participants.data
            }
          />
        ) : (
          <LoginToView raffleId={raffleId} />
        )
      }
    />
  );
};

const LoginToView: React.FC<{ raffleId: number }> = ({ raffleId }) => (
  <Column gap={2}>
    <Typography color="text.arcade" typography="h6">
      <Link href={routes.signUp.path()} color="text.arcade">
        Create an account
      </Link>{' '}
      to view the participants and winners of this raffle.
    </Typography>
    <Column gap={1} mt={2}>
      <Typography fontWeight={500} color="text.arcade">
        Want to view the participants and winners?
      </Typography>
      <Button
        variant="arcade"
        color="warning"
        href={routes.login.path({
          query: {
            redirect: routes.raffle.path({
              params: {
                raffleId,
              },
            }),
          },
        })}
        startIcon={<LoginOutlined />}
        sx={{
          width: 225,
        }}
      >
        Login To View
      </Button>
    </Column>
    <Column gap={1}>
      <Typography fontWeight={500} color="text.arcade">
        Don't have an account?
      </Typography>
      <Button
        variant="arcade"
        color="secondary"
        href={routes.signUp.path({
          query: {
            redirect: routes.raffle.path({
              params: {
                raffleId,
              },
            }),
          },
        })}
        startIcon={<VpnKeyOutlined />}
        sx={{
          width: 225,
        }}
      >
        Register Now
      </Button>
    </Column>
  </Column>
);
