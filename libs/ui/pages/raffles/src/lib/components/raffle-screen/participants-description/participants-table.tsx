import {
  ArrowRightAlt,
  LocalActivityOutlined,
  OpenInNew,
  Star,
} from '@mui/icons-material';
import {
  alpha,
  Box,
  Button,
  Link,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ValentinesGift } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { toPercentage } from '@worksheets/util/numbers';
import { ParticipationSchema } from '@worksheets/util/types';

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

export const ParticipantsTable: React.FC<{
  participants: ParticipationSchema[];
}> = ({ participants }) => {
  const isMobile = useMediaQueryDown('mobile1');
  if (participants.length === 0) {
    return <Placeholder />;
  }

  const total = participants.reduce((acc, participant) => {
    return acc + participant.numEntries;
  }, 0);

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
          </TableRow>
        </TableHead>
        <TableBody>
          {participants.map((participant) => (
            <TableRow
              key={participant.user.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor: (theme) =>
                  participant.winner
                    ? alpha(theme.palette.primary.main ?? '', 0.3)
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
                <Link
                  href={routes.user.path({
                    params: {
                      userId: participant.user.id,
                    },
                  })}
                  fontWeight={500}
                >
                  {participant.user.username}
                </Link>
              </TableCell>

              <TableCell align="right">
                <LocalActivityOutlined
                  fontSize="small"
                  sx={{ mb: -0.5, mr: 0.5 }}
                />
                {participant.numEntries}
              </TableCell>
              <TableCell align="right">
                {toPercentage(participant.numEntries, total, 1)}
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
