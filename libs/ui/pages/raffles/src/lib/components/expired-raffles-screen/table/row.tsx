import { Link, TableCell, TableRow } from '@mui/material';
import { routes } from '@worksheets/ui/routes';
import { printShortDateTime } from '@worksheets/util/time';
import { BasicRaffleDetails } from '@worksheets/util/types';

export const ExpiredRaffleTableRow: React.FC<{
  raffle: BasicRaffleDetails;
}> = ({ raffle }) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left">
        <Link
          href={routes.raffle.path({
            params: { raffleId: raffle.id },
          })}
        >
          {raffle.id}
        </Link>
      </TableCell>

      <TableCell align="left">{raffle.name}</TableCell>

      <TableCell align="right">
        {printShortDateTime(raffle.expiresAt)}
      </TableCell>
    </TableRow>
  );
};
