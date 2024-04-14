import { Box, Link, styled, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { routes } from '@worksheets/routes';
import { printShortDateTime } from '@worksheets/util/time';
import { EnteredRaffleSchema } from '@worksheets/util/types';
import * as React from 'react';

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export const ParticipationTable: React.FC<{
  raffles: EnteredRaffleSchema[];
}> = ({ raffles }) => {
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
            <TableCell>Raffle ID</TableCell>
            <TableCell>Prize</TableCell>
            <TableCell>Entries</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Expiration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {raffles.map((raffle) => (
            <TableRow
              key={raffle.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link
                  href={routes.raffle.path({
                    params: { raffleId: raffle.id },
                  })}
                >
                  {raffle.id}
                </Link>
              </TableCell>
              <TableCell>{raffle.name}</TableCell>
              <TableCell>{raffle.entries}</TableCell>
              <TableCell>
                <Typography
                  fontWeight={700}
                  color={
                    raffle.expiresAt < Date.now()
                      ? 'error.main'
                      : 'success.main'
                  }
                >
                  {raffle.expiresAt < Date.now() ? 'Expired' : 'Active'}
                </Typography>
              </TableCell>
              <TableCell>{printShortDateTime(raffle.expiresAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
