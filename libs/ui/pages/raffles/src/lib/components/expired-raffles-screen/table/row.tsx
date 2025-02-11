import { Link, TableCell, TableRow } from '@mui/material';
import { RaffleStatus } from '@worksheets/prisma';
import { playRoutes } from '@worksheets/routes';
import { printShortDateTime } from '@worksheets/util/time';
import { BasicRaffleDetails } from '@worksheets/util/types';

export const ExpiredRaffleTableRow: React.FC<{
  raffle: BasicRaffleDetails;
}> = ({ raffle }) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell align="left">
        <Link
          href={playRoutes.raffle.path({
            params: { raffleId: raffle.id },
          })}
        >
          {raffle.id}
        </Link>
      </TableCell>

      <TableCell align="left">{raffle.name}</TableCell>

      <TableCell align="right">{RAFFLE_STATUS_LABEL[raffle.status]}</TableCell>
      <TableCell align="right">
        {printShortDateTime(raffle.expiresAt)}
      </TableCell>
    </TableRow>
  );
};

const RAFFLE_STATUS_LABEL: Record<RaffleStatus, string> = {
  PENDING: 'Pending',
  ACTIVE: 'Raffle In Progress',
  COMPLETE: 'Raffle Complete',
  CANCELLED: 'Raffle Cancelled',
};
