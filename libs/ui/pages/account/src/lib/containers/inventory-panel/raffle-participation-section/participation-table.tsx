import { Box, Link, styled, TablePagination, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { playRoutes } from '@worksheets/routes';
import { usePseudoPagination } from '@worksheets/ui/components/pagination';
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
  const { rows, ...pagination } = usePseudoPagination(raffles);
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
          {rows.map((raffle) => (
            <TableRow key={raffle.id}>
              <TableCell component="th" scope="row">
                <Link
                  href={playRoutes.raffle.path({
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
      <TablePagination
        sx={{
          [`& .MuiTablePagination-toolbar`]: {
            minHeight: 32,
          },
          [`& .MuiTablePagination-displayedRows`]: {
            margin: 0,
          },
        }}
        size="small"
        component="div"
        rowsPerPageOptions={[]}
        {...pagination}
      />
    </TableContainer>
  );
};
