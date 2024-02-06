import { Link, TableCell, TableRow } from '@mui/material';
import { printShortDateTime } from '@worksheets/util/time';
import { BasicPrizeDetails } from '@worksheets/util/types';

export const ExpiredRaffleTableRow: React.FC<{ raffle: BasicPrizeDetails }> = ({
  raffle,
}) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left">
        <Link href={`/prizes/${raffle.id}`}>{raffle.id}</Link>
      </TableCell>

      <TableCell align="left">{raffle.name}</TableCell>

      <TableCell align="right">
        {printShortDateTime(raffle.expiresAt)}
      </TableCell>
    </TableRow>
  );
};
