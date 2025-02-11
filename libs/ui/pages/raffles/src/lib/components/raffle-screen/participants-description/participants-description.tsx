import { LocalActivity, Star } from '@mui/icons-material';
import { Button } from '@mui/material';
import { playRoutes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Description } from '@worksheets/ui/components/description';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { LoginToView } from '@worksheets/ui/components/login';
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
        session.status === 'authenticated' &&
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
            userId={session.data?.user.id}
            participants={
              winnersOnly
                ? participants.data.filter((p) => p.winner)
                : participants.data
            }
          />
        ) : (
          <LoginToView
            redirect={playRoutes.raffle.path({
              params: {
                raffleId,
              },
            })}
            title="view the participants and winners of this raffle"
            subtitle="Want to view the participants and winners?"
          />
        )
      }
    />
  );
};
