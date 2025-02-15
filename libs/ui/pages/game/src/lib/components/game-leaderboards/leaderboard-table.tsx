import { EmojiEvents, OpenInNew } from '@mui/icons-material';
import {
  alpha,
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ValentinesWings } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { Row } from '@worksheets/ui/components/flex';
import { LeaderboardPlayerSchema } from '@worksheets/util/types';

const StyledBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  '& thead': {
    backgroundColor: theme.palette.grey[200],
  },
  '& td, & th': {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.body3.fontSize,
    },
  },
}));

export const LeaderboardTable: React.FC<{
  players: LeaderboardPlayerSchema[];
  participation: LeaderboardPlayerSchema | null;
}> = ({ players, participation }) => {
  const rankThreshold = 3;
  if (players.length === 0) {
    return <Placeholder />;
  }

  if (
    participation &&
    players.findIndex((player) => player.user.id === participation?.user.id) ===
      -1
  ) {
    players.push(participation);
  }

  return (
    <TableContainer component={StyledBox}>
      <Table
        size="small"
        sx={{
          minWidth: 400,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell width="90%">Player</TableCell>
            <TableCell width="10%" align="right">
              Score
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player) => (
            <TableRow
              key={player.user.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: (theme) =>
                  player.user.id === participation?.user.id
                    ? alpha(theme.palette.primary.main, 0.15)
                    : player.rank <= rankThreshold
                    ? alpha(theme.palette.yellow.main, 0.15)
                    : theme.palette.background.paper,
              }}
            >
              <TableCell align="left">{player.rank}</TableCell>
              <TableCell scope="row">
                <Row gap={1} alignItems="flex-end">
                  {player.rank <= rankThreshold && (
                    <EmojiEvents
                      fontSize="small"
                      color="warning"
                      sx={{
                        visibility: player ? 'visible' : 'hidden',
                      }}
                    />
                  )}
                  <Typography
                    fontWeight={
                      player.user.id === participation?.user.id ? 700 : 500
                    }
                  >
                    {player.user.username}
                  </Typography>
                </Row>
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  fontWeight:
                    player.user.id === participation?.user.id
                      ? 'bold'
                      : 'normal',
                }}
              >
                {player.score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
    <ValentinesWings
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
      Be the first to participate!
    </Typography>
    <Typography typography={{ xs: 'body2', sm: 'body1' }} color="text.arcade">
      This leaderboard has no participants yet. Be the first to participate and
      win amazing rewards!
    </Typography>
    <Button
      variant="arcade"
      href={routes.help.playingGames.path()}
      target="_blank"
      startIcon={<OpenInNew />}
      color="error"
      sx={{ mt: 2 }}
    >
      Learn More
    </Button>
  </Box>
);
