import { Alarm, Cancel, Check, InfoOutlined } from '@mui/icons-material';
import { Box, Button, Link, styled, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ValentinesGift } from '@worksheets/icons/valentines';
import { prizeTypeLogos } from '@worksheets/ui/components/prizes';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import {
  durationToString,
  millisecondsAsDuration,
} from '@worksheets/util/time';
import { WonPrizeDetails } from '@worksheets/util/types';
import * as React from 'react';

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export const PrizesTable: React.FC<{
  prizes: WonPrizeDetails[];
  onClaim: (prize: WonPrizeDetails) => void;
}> = ({ prizes, onClaim }) => {
  const isMobile = useMediaQueryDown('sm');

  if (prizes.length === 0) {
    return <EmptyPrizesPlaceholder />;
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
            <TableCell>
              <InfoOutlined fontSize="small" sx={{ mt: 0.8 }} />
            </TableCell>
            <TableCell align="left">ID</TableCell>
            <TableCell width="50%">Name</TableCell>
            <TableCell
              align="center"
              sx={{
                display: isMobile ? 'none' : 'table-cell',
              }}
            >
              Claim By
            </TableCell>
            <TableCell align="right" width={180}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prizes.map((prize) => (
            <PrizeRow key={prize.id} prize={prize} onClaim={onClaim} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const PrizeRow: React.FC<{
  prize: WonPrizeDetails;
  onClaim: (prize: WonPrizeDetails) => void;
}> = ({ prize, onClaim }) => {
  const isMobile = useMediaQueryDown('sm');
  const PrizeTypeLogo = prizeTypeLogos[prize.type];
  return (
    <TableRow
      key={prize.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell width={12}>
        <PrizeTypeLogo
          sx={{
            height: 24,
            width: 24,
          }}
        />
      </TableCell>
      <TableCell
        align="left"
        component="th"
        scope="row"
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        <Link href={`/prizes/${prize.id}`}>{prize.id}</Link>
      </TableCell>

      <TableCell
        width="50%"
        sx={{
          whiteSpace: 'nowrap',
        }}
      >
        <b>{prize.name}</b>
      </TableCell>
      <TableCell
        align="center"
        sx={{
          whiteSpace: 'nowrap',
          display: isMobile ? 'none' : 'table-cell',
        }}
      >
        {expired(prize) ? (
          <i>Expired</i>
        ) : prize.claimedAt ? (
          <i>Claimed</i>
        ) : (
          <b>
            {durationToString(
              millisecondsAsDuration(prize.claimBy - Date.now())
            )}
          </b>
        )}
      </TableCell>
      <TableCell align="right" width={180}>
        <Button
          onClick={() => onClaim(prize)}
          disabled={expired(prize)}
          size="small"
          variant="arcade"
          color={prize.claimedAt ? 'success' : 'secondary'}
          startIcon={
            expired(prize) ? (
              <Cancel />
            ) : prize.claimedAt ? (
              <Check />
            ) : (
              <Alarm />
            )
          }
          sx={{ mb: 0.5, minWidth: 135 }}
        >
          {expired(prize)
            ? 'Expired'
            : prize.claimedAt
            ? 'View Code'
            : 'Claim Now'}
        </Button>
      </TableCell>
    </TableRow>
  );
};

const expired = (prize: WonPrizeDetails) => prize.claimBy < Date.now();

const EmptyPrizesPlaceholder = () => {
  const isMobile = useMediaQueryDown('sm');
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        flexDirection: 'column',
        border: (theme) => `1px solid ${theme.palette.divider}`,
        padding: 3,
        gap: 2,
        textAlign: 'center',
      }}
    >
      <ValentinesGift
        sx={{
          height: isMobile ? 100 : 150,
          width: isMobile ? 100 : 150,
          py: 2,
        }}
      />
      <Typography typography={{ xs: 'h6', sm: 'h5', md: 'h4' }} color="error">
        You haven't won any prizes yet
      </Typography>
      <Typography variant="body2">
        Participate in a Raffle to win a prize!
      </Typography>
      <Typography variant="body2">
        Keep playing games and referring friends to earn more tokens and win
        prizes!
      </Typography>
      <Link href="/help/prize-wall" variant="body1" color="error">
        Learn More
      </Link>
    </Box>
  );
};
