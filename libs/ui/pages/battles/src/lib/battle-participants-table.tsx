import { OpenInNew } from '@mui/icons-material';
import { Star } from '@mui/icons-material';
import { alpha, Box, Button, Link, Typography } from '@mui/material';
import { Sword } from '@worksheets/icons/dazzle';
import { playRoutes } from '@worksheets/routes';
import { Table, TableCell, TableRow } from '@worksheets/ui/components/tables';
import { toPercentage } from '@worksheets/util/numbers';
import { BattleParticipationSchema } from '@worksheets/util/types';
import pluralize from 'pluralize';

export const BattleParticipantsTable: React.FC<{
  participants: BattleParticipationSchema[];
  total: number;
  userId: string | undefined;
}> = ({ participants, total, userId }) => {
  if (participants.length === 0) {
    return <Placeholder />;
  }

  return (
    <Table
      head={
        <>
          <TableCell
            align="center"
            sx={{
              px: 1,
              minWidth: 24,
              width: 24,
              maxWidth: 24,
            }}
          ></TableCell>
          <TableCell width="80%">
            {participants.length}{' '}
            {pluralize('Participant', participants.length)}{' '}
          </TableCell>
          <TableCell width="10%" align="center">
            Damage
          </TableCell>
          <TableCell width="10%" align="center">
            Ratio
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
                  participant.mvp
                    ? alpha(theme.palette.secondary.main, 0.15)
                    : participant.user.id === userId
                    ? alpha(theme.palette.primary.main, 0.15)
                    : theme.palette.background.paper,
              }}
            >
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
                    visibility: participant.mvp ? 'visible' : 'hidden',
                  }}
                />
              </TableCell>
              <TableCell scope="row">
                <Link
                  href={playRoutes.user.path({
                    params: {
                      userId: participant.user.id,
                    },
                  })}
                  fontWeight={participant.user.id === userId ? 700 : 500}
                >
                  {participant.user.username}
                </Link>
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight:
                    participant.user.id === userId ? 'bold' : 'normal',
                }}
              >
                {participant.damage}
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight:
                    participant.user.id === userId ? 'bold' : 'normal',
                }}
              >
                {toPercentage(participant.damage, total, 1)}
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
    <Sword
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
      Be the first to participate in this battle!
    </Typography>
    <Typography typography={{ xs: 'body2', sm: 'body1' }} color="text.arcade">
      Use weapons to join the battle and find rare loot! The more weapons you
      use, the higher your chances of winning.
    </Typography>
    <Button
      variant="arcade"
      href={playRoutes.help.mobs.path()}
      target="_blank"
      startIcon={<OpenInNew />}
      color="error"
      sx={{ mt: 2 }}
    >
      Learn More
    </Button>
  </Box>
);
