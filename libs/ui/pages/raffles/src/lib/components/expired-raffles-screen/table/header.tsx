import { TableCell, TableHead, TableRow } from '@mui/material';

export const ExpiredRaffleTableHead = () => (
  <TableHead>
    <TableRow sx={{ th: { textWrap: 'nowrap' } }}>
      <TableCell align="left">ID</TableCell>
      <TableCell align="left">Prize</TableCell>
      <TableCell align="right">Expired</TableCell>
    </TableRow>
  </TableHead>
);
