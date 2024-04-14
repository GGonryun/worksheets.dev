import { Box, Typography, TypographyProps } from '@mui/material';
import { Description } from '@worksheets/ui/components/description';
import { ParticipationSchema } from '@worksheets/util/types';
import React from 'react';

export const ParticipantsDescription: React.FC<{
  participants: ParticipationSchema[];
}> = ({ participants }) => {
  const winners = participants.filter((p) => p.winner);
  return (
    <Description
      title="Participants & Winners"
      description={
        <Box display="flex" flexDirection="column" gap={1}>
          <Heading>Winners</Heading>
          {winners.length ? (
            winners.map((winner) => (
              <Typography>
                <b>{winner.user.username}</b>
              </Typography>
            ))
          ) : (
            <Typography>
              The raffle is still active and there are no winners yet.
            </Typography>
          )}
          <br />
          <Heading>Total Participants: {participants.length}</Heading>
          {participants.map((participant, i) => (
            <Typography key={i}>
              <b>{participant.user.username}</b> — {participant.numEntries}{' '}
              entries
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
