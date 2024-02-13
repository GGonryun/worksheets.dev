import { Box, Typography, TypographyProps } from '@mui/material';
import { Description } from '@worksheets/ui/components/description';
import { DetailedRaffleSchema } from '@worksheets/util/types';
import React from 'react';

export const ParticipantsDescription: React.FC<{
  winners: DetailedRaffleSchema['winners'];
  participants: DetailedRaffleSchema['participants'];
}> = ({ winners, participants }) => {
  return (
    <Description
      title="Participants & Winners"
      description={
        <Box display="flex" flexDirection="column" gap={1}>
          <Heading>Winners</Heading>
          {winners.length ? (
            winners.map((winner) => (
              <Typography>
                <b>{winner.username}</b> ({winner.userId})
              </Typography>
            ))
          ) : (
            <Typography>
              The raffle is still active and there are no winners yet.
            </Typography>
          )}
          <br />
          <Heading>Total Participants: {participants.length}</Heading>
          {participants.map((participant) => (
            <Typography>
              <b>{participant.username}</b> ({participant.userId}) —{' '}
              {participant.numTickets} tickets
            </Typography>
          ))}
        </Box>
      }
    />
  );
};

const Heading: React.FC<Pick<TypographyProps, 'children'>> = ({ children }) => (
  <Typography typography={{ xs: 'h6', sm: 'h5' }}>{children}</Typography>
);
