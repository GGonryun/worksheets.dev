import {
  CalendarMonth,
  Favorite,
  FavoriteBorderOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
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
import { printRelativeDate } from '@worksheets/util/time';
import { Friend } from '@worksheets/util/types';
import * as React from 'react';

import { sortByGiftSentAt } from '../../../util/sorting';
import { EmptyFriendsPlaceholder } from '../empty-friends-placeholder';

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export const GiftsTable: React.FC<{
  friends: Friend[];
  canSendGifts: boolean;
  onFavorite: (friend: Friend) => void;
  onSendGift: (friend: Friend) => void;
}> = ({ friends: mixedFriends, canSendGifts, onFavorite, onSendGift }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (mixedFriends.length === 0) {
    return <EmptyFriendsPlaceholder />;
  }

  const favorites = mixedFriends
    .filter((f) => f.isFavorite)
    .sort(sortByGiftSentAt);
  const others = mixedFriends
    .filter((f) => !f.isFavorite)
    .sort(sortByGiftSentAt);

  const friends = [...favorites, ...others];

  return (
    <TableContainer component={StyledBox}>
      <Table size="small">
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
            <TableCell width="60%">Username</TableCell>
            {/* Last Seen */}
            <TableCell
              align="center"
              sx={{
                display: isMobile ? 'none' : 'table-cell',
              }}
            >
              <Tooltip title="When was the gift sent today">
                <CalendarMonth
                  fontSize="small"
                  color="primary"
                  sx={{ mb: '-4px' }}
                />
              </Tooltip>
            </TableCell>
            {/* Gift Sent */}
            <TableCell align="center" width={50}></TableCell>
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

              <TableCell
                align="center"
                sx={{
                  textWrap: 'nowrap',
                  display: isMobile ? 'none' : 'table-cell',
                  fontSize: '0.8rem',
                }}
              >
                {friend.giftSentAt
                  ? printRelativeDate({
                      stamp: friend.giftSentAt,
                      includeTime: false,
                    })
                  : 'Not Sent'}
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  textWrap: 'nowrap',
                }}
              >
                <Tooltip
                  title={
                    !canSendGifts
                      ? 'All gifts sent today'
                      : 'Gift already sent today'
                  }
                  disableHoverListener={!friend.giftSentAt && canSendGifts}
                >
                  <span>
                    <Button
                      size="small"
                      variant="arcade"
                      color="secondary"
                      disabled={!canSendGifts || friend.giftSentAt != null}
                      onClick={() => onSendGift(friend)}
                      sx={{
                        fontSize: '0.8rem',
                        mb: 0.5,
                      }}
                    >
                      Send Gift
                    </Button>
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export type GiftsTableProps = React.ComponentProps<typeof GiftsTable>;