import { Star } from '@mui/icons-material';
import { Box, Link, Typography, TypographyProps } from '@mui/material';
import { routes } from '@worksheets/routes';
import { trpc } from '@worksheets/trpc-charity';
import { Description } from '@worksheets/ui/components/description';
import { ErrorComponent } from '@worksheets/ui/components/errors';
import { Row } from '@worksheets/ui/components/flex';
import { LoadingBar } from '@worksheets/ui/components/loading';
import React from 'react';

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

export const ParticipantsDescription: React.FC<{
  raffleId: number;
}> = ({ raffleId }) => {
  return (
    <Description
      hideLogo
      open
      title="Participants & Winners"
      description={<Content raffleId={raffleId} />}
    />
  );
};

const Heading: React.FC<Pick<TypographyProps, 'children'>> = ({ children }) => (
  <Typography typography={{ xs: 'h6', sm: 'h5' }}>{children}</Typography>
);
