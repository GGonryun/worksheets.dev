import { LoginOutlined, Star, VpnKeyOutlined } from '@mui/icons-material';
import { Box, Button, Link, Typography, TypographyProps } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Description } from '@worksheets/ui/components/description';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Column, Row } from '@worksheets/ui/components/flex';
import { LoadingBar } from '@worksheets/ui/components/loading';
import { useSession } from 'next-auth/react';
import React from 'react';

export const ParticipantsDescription: React.FC<{
  raffleId: number;
}> = ({ raffleId }) => {
  const session = useSession();
  return (
    <Description
      hideLogo
      open
      title="Participants & Winners"
      description={
        session.status === 'loading' ? (
          <LoadingBar />
        ) : session.status === 'authenticated' ? (
          <Content raffleId={raffleId} />
        ) : (
          <LoginToView raffleId={raffleId} />
        )
      }
    />
  );
};
const Content: React.FC<{ raffleId: number }> = ({ raffleId }) => {
  const participants = trpc.maybe.raffles.participants.useQuery({
    raffleId,
  });

  if (participants.isError) return <ErrorComponent color="text.primary" />;
  if (participants.isLoading) return <LoadingBar />;

  const winners = participants.data.filter((p) => p.winner);

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <Heading>Winners</Heading>
      {winners.length ? (
        winners.map((winner) => (
          <Row key={winner.userId} gap={1}>
            <Star fontSize="small" />
            <Typography
              component={Link}
              underline="hover"
              color="text.arcade"
              href={routes.user.path({
                params: {
                  userId: winner.user.id,
                },
              })}
            >
              <b>{winner.user.username}</b>
            </Typography>
          </Row>
        ))
      ) : (
        <Typography>
          The raffle is still active and there are no winners yet.
        </Typography>
      )}
      <br />
      <Heading>
        Total Participants:{' '}
        {participants.data.length > 100 ? '99+' : participants.data.length}
      </Heading>
      {participants.data.map((participant, i) => (
        <Typography
          key={i}
          component={Link}
          underline="hover"
          color="text.arcade"
          href={routes.user.path({
            params: {
              userId: participant.user.id,
            },
          })}
        >
          <b>{participant.user.username}</b> — {participant.numEntries} entries
        </Typography>
      ))}
    </Box>
  );
};

const Heading: React.FC<Pick<TypographyProps, 'children'>> = ({ children }) => (
  <Typography typography={{ xs: 'h6', sm: 'h5' }}>{children}</Typography>
);

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
