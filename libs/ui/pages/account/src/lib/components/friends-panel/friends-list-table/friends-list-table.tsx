import {
  AccessTime,
  Cancel,
  Favorite,
  FavoriteBorderOutlined,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  styled,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { WebGamepad } from '@worksheets/icons/web';
import { shorthandNumber } from '@worksheets/util/numbers';
import { printRelativeDate } from '@worksheets/util/time';
import * as React from 'react';

import { Friend } from '../../../types';
import { EmptyFriendsPlaceholder } from '../table-placeholder';

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export const FriendsListTable: React.FC<{
  friends: Friend[];
  onRemove: (friend: Friend) => void;
  onFavorite: (friend: Friend) => void;
}> = ({ friends, onRemove, onFavorite }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (friends.length === 0) {
    return <EmptyFriendsPlaceholder />;
  }

  return (
    <TableContainer component={StyledBox}>
      <Table
        size="small"
        sx={{
          minWidth: 400,
        }}
      >
        <TableHead>
          <TableRow sx={{ th: { textWrap: 'nowrap' } }}>
            <TableCell align="left" width={32}>
              <Tooltip title="Favorites are shown at the top of the list">
                <span>
                  <IconButton size="small" disabled>
                    <Favorite color="secondary" fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </TableCell>
            <TableCell align="left" width={32}>
              <Tooltip title="Remove friends from your friends list">
                <span>
                  <IconButton size="small" disabled>
                    <Cancel color="error" fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </TableCell>
            <TableCell width="60%">Username</TableCell>
            {/* Total Games */}
            <TableCell
              align="center"
              sx={{
                display: isMobile ? 'none' : 'table-cell',
              }}
            >
              <Tooltip title="Total games played by this user">
                <WebGamepad fontSize="small" sx={{ mb: '-6px' }} />
              </Tooltip>
            </TableCell>
            {/* Last Seen */}
            <TableCell
              align="center"
              sx={{
                display: isMobile ? 'none' : 'table-cell',
              }}
            >
              <Tooltip title="When the user was last seen">
                <AccessTime
                  fontSize="small"
                  color="primary"
                  sx={{ mb: '-4px' }}
                />
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {friends.map((friend) => (
            <TableRow
              key={friend.id}
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

              <TableCell align="left" width={32}>
                <Tooltip
                  title="Unfavorite this friend to remove them from your friends list"
                  disableHoverListener={!friend.isFavorite}
                >
                  <span>
                    <IconButton
                      size="small"
                      disabled={friend.isFavorite}
                      color="error"
                      onClick={() => onRemove(friend)}
                    >
                      <Cancel fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
              </TableCell>

              <TableCell>{friend.username ?? friend.id}</TableCell>

              <TableCell
                align="center"
                sx={{
                  display: isMobile ? 'none' : 'table-cell',
                  fontSize: '0.8rem',
                }}
              >
                {shorthandNumber(friend.gamesPlayed)}
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  textWrap: 'nowrap',
                  display: isMobile ? 'none' : 'table-cell',
                  fontSize: '0.8rem',
                }}
              >
                {printRelativeDate({
                  stamp: friend.lastSeen,
                  includeTime: false,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export type FriendsTableProps = React.ComponentProps<typeof FriendsListTable>;
