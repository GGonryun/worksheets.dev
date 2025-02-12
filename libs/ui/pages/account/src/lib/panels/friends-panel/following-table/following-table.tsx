import {
  Cancel,
  Favorite,
  FavoriteBorderOutlined,
  Info,
} from '@mui/icons-material';
import { Box, Button, IconButton, styled, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Friend } from '@worksheets/util/types';
import * as React from 'react';

import { sortByLastSeen } from '../../../util/sorting';

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export const FollowingTable: React.FC<{
  friends: Friend[];
  onRemove: (friend: Friend) => void;
  onFavorite: (friend: Friend) => void;
}> = ({ friends: mixedFriends, onRemove, onFavorite }) => {
  const favorites = mixedFriends
    .filter((f) => f.isFavorite)
    .sort(sortByLastSeen);
  const others = mixedFriends.filter((f) => !f.isFavorite).sort(sortByLastSeen);

  const friends = [...favorites, ...others];

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
            <TableCell align="center" width={32}>
              <Tooltip title="Favorites are shown at the top of the list">
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
        <TableBody>
          {friends.map((friend) => (
            <TableRow
              key={friend.friendshipId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left" width={32}>
                <IconButton size="small" onClick={() => onFavorite(friend)}>
                  {friend.isFavorite ? (
                    <Favorite color="secondary" fontSize="small" />
                  ) : (
                    <FavoriteBorderOutlined
                      color="secondary"
                      fontSize="small"
                    />
                  )}
                </IconButton>
              </TableCell>

              <TableCell>{friend.username}</TableCell>

              <TableCell align="center" width={32}>
                <Button
                  size="small"
                  variant="arcade"
                  color="error"
                  onClick={() => onRemove(friend)}
                  sx={{
                    minWidth: 125,
                    mb: 0.5,
                  }}
                  startIcon={<Cancel fontSize="small" />}
                >
                  Unfollow
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
