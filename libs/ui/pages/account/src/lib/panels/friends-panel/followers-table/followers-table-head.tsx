import { Info } from '@mui/icons-material';
import {
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';

export const FollowersTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell width={32} align="center">
          <Tooltip title="Followers that have you as a favorite">
            <span>
              <IconButton size="small" disabled>
                <Info color="info" fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </TableCell>
        <TableCell>Username</TableCell>
        <TableCell align="center">Status</TableCell>
      </TableRow>
    </TableHead>
  );
};
