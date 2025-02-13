import {
  ArrowRightAlt,
  LocalActivityOutlined,
  OpenInNew,
  Star,
} from '@mui/icons-material';
import { alpha, Box, Button, Typography } from '@mui/material';
import { ValentinesGift } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { Table, TableCell, TableRow } from '@worksheets/ui/components/tables';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { toPercentage } from '@worksheets/util/numbers';
import { ParticipationSchema } from '@worksheets/util/types';
import pluralize from 'pluralize';

export const ParticipantsTable: React.FC<{
  participants: ParticipationSchema[];
  total: number;
  userId: string | undefined;
}> = ({ participants, total, userId }) => {
  const isMobile = useMediaQueryDown('mobile1');
  if (participants.length === 0) {
    return <Placeholder />;
  }

  return (
    <Table
      title={
        <Box>
          <Typography fontWeight={700} color="text.arcade">
            {participants.length}{' '}
            {pluralize('participants', participants.length)}{' '}
            {pluralize('have', participants.length)} joined the giveaway
          </Typography>
          <Typography mb={1} fontWeight={700} gutterBottom color="text.arcade">
            {total} giveaway {pluralize('entry', total)} in total
          </Typography>
        </Box>
      }
      head={
        <>
          {!isMobile && (
            <TableCell
              align="center"
              sx={{
                px: 1,
                minWidth: 24,
                width: 24,
                maxWidth: 24,
              }}
            ></TableCell>
          )}
          <TableCell width="80%">
            Participant{' '}
            {isMobile ? (
              <ArrowRightAlt
                sx={{
                  mb: -1,
                  float: 'right',
                }}
              />
            ) : null}
          </TableCell>
          <TableCell width="10%" align="right">
            Entries
          </TableCell>
          <TableCell width="10%" align="right">
            Chance
          </TableCell>
        </>
      }
      body={
        <>
          {participants.map((participant) => (
            <TableRow
              key={participant.user.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: (theme) =>
                  participant.winner
                    ? alpha(theme.palette.secondary.main, 0.15)
                    : participant.user.id === userId
                    ? alpha(theme.palette.primary.main, 0.15)
                    : theme.palette.background.paper,
              }}
            >
              {!isMobile && (
                <TableCell
                  align="center"
                  sx={{
                    px: 1,
                    minWidth: 24,
                    width: 24,
                    maxWidth: 24,
                  }}
                >
                  <Star
                    color="yellow"
                    sx={{
                      mb: -0.5,
                      visibility: participant.winner ? 'visible' : 'hidden',
                    }}
                  />
                </TableCell>
              )}
              <TableCell scope="row">
                <Typography
                  fontWeight={participant.user.id === userId ? 700 : 500}
                >
                  {participant.user.username}
                </Typography>
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  fontWeight:
                    participant.user.id === userId ? 'bold' : 'normal',
                }}
              >
                <LocalActivityOutlined
                  fontSize="small"
                  sx={{ mb: -0.5, mr: 0.5 }}
                />
                {participant.numEntries}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight:
                    participant.user.id === userId ? 'bold' : 'normal',
                }}
              >
                {toPercentage(participant.numEntries, total, 1)}
              </TableCell>
            </TableRow>
          ))}
        </>
      }
    />
  );
};

const Placeholder = () => (
  <Box
    sx={{
      width: '100%',
      display: 'grid',
      placeItems: 'center',
      flexDirection: 'column',
      textAlign: 'center',
    }}
  >
    <ValentinesGift
      sx={{
        height: 150,
        width: 150,
        py: 2,
      }}
    />
    <Typography
      typography={{ xs: 'h6', sm: 'h5', md: 'h4' }}
      color="text.arcade"
    >
      Be the first to participate in this raffle!
    </Typography>
    <Typography typography={{ xs: 'body2', sm: 'body1' }} color="text.arcade">
      You can win amazing prizes by participating in this raffle. Don't miss
      out!
    </Typography>
    <Button
      variant="arcade"
      href={routes.help.prizes.path()}
      target="_blank"
      startIcon={<OpenInNew />}
      color="error"
      sx={{ mt: 2 }}
    >
      Learn More
    </Button>
  </Box>
);
