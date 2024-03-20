import { Box, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { BasicRaffleDetails } from '@worksheets/util/types';
import * as React from 'react';

import { ExpiredRaffleTableHead } from './header';
import { ExpiredRaffleTableRow } from './row';

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export const ExpiredRafflesTable: React.FC<{
  raffles: BasicRaffleDetails[];
}> = ({ raffles }) => {
  return (
    <TableContainer component={StyledBox}>
      <Table
        size="small"
        sx={{
          minWidth: 600,
        }}
      >
        <ExpiredRaffleTableHead />
        <TableBody>
          {raffles.map((raffle) => (
            <ExpiredRaffleTableRow key={raffle.id} raffle={raffle} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
