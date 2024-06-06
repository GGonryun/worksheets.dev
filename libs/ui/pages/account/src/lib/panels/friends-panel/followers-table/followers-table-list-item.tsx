import { AddCircle } from '@mui/icons-material';
import { Button, TableCell, TableRow, Tooltip } from '@mui/material';
import { Follower } from '@worksheets/util/types';

import { FavoriteIcon } from './favorite-icon';

export const FollowersTableListItem: React.FC<{
  follower: Follower;
  onAdd: (code: string) => void;
}> = ({ follower, onAdd }) => (
  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
    <TableCell align="center" width={32}>
      {follower.isFavorite && <FavoriteIcon username={follower.username} />}
    </TableCell>

    <TableCell>{follower.username}</TableCell>

    <TableCell align="center" width={32}>
      <Tooltip
        title="You are already friends this user!"
        disableHoverListener={!follower.isFriend}
      >
        <span>
          <Button
            size="small"
            variant="arcade"
            color="secondary"
            disabled={follower.isFriend}
            onClick={() => onAdd(follower.friendCode)}
            sx={{
              minWidth: 125,
              mb: 0.5,
            }}
            startIcon={<AddCircle fontSize="small" />}
          >
            {follower.isFriend ? 'Following' : 'Follow'}
          </Button>
        </span>
      </Tooltip>
    </TableCell>
  </TableRow>
);
