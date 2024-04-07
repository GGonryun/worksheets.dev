import { TableCell, TableHead, TableRow } from '@mui/material';

export const FollowersTableHead = () => {
  return (
    <TableHead>
      <TableRow sx={{ th: { textWrap: 'nowrap' } }}>
        <TableCell width={32}></TableCell>
        <TableCell>Username</TableCell>
        <TableCell align="center">Following</TableCell>
      </TableRow>
    </TableHead>
  );
};
