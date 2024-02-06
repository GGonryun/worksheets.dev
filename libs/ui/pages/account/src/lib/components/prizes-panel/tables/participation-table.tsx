import { Box, Link, styled, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ValentinesLetter } from '@worksheets/icons/valentines';
import { useMediaQueryDown } from '@worksheets/ui/hooks/use-media-query';
import { printShortDateTime } from '@worksheets/util/time';
import { BasicPrizeDetails } from '@worksheets/util/types';
import * as React from 'react';

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export const ParticipationTable: React.FC<{
  prizes: BasicPrizeDetails[];
}> = ({ prizes }) => {
  if (prizes.length === 0) {
    return <EmptyParticipationTable />;
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
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Expired</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prizes.map((prize) => (
            <TableRow
              key={prize.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link href={`/prizes/${prize.id}`}>{prize.id}</Link>
              </TableCell>

              <TableCell>
                <b>{prize.name}</b>
              </TableCell>
              <TableCell align="right">
                {printShortDateTime(prize.expiresAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const EmptyParticipationTable = () => {
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
      }}
    >
      <ValentinesLetter
        sx={{
          height: isMobile ? 100 : 150,
          width: isMobile ? 100 : 150,
          py: 2,
        }}
      />
      <Typography typography={{ xs: 'h6', sm: 'h5', md: 'h4' }} color="error">
        You haven't participated in any raffles yet
      </Typography>
      <Typography variant="body2">
        Redeem your tokens for Raffle Tickets or Prizes.
      </Typography>
      <Typography variant="body2">
        Play games and refer friends to earn more tokens.
      </Typography>
      <Link href="/help/prize-wall" variant="body1" color="error">
        Learn More
      </Link>
    </Box>
  );
};
