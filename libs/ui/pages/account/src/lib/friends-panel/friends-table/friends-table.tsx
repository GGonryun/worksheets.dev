import {
  AccessTime,
  Cancel,
  Favorite,
  FavoriteBorderOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Link,
  styled,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ValentinesGift } from '@worksheets/icons/valentines';
import { WebGamepad } from '@worksheets/icons/web';
import { shorthandNumber } from '@worksheets/util/numbers';
import { printRelativeDate } from '@worksheets/util/time';
import * as React from 'react';

import { MAX_DAILY_GIFT_BOX_SHARES } from '../../const';
import { Friend } from '../../types';

const StyledBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

export type FriendsTableProps = {
  friends: Friend[];
  canSendGifts: boolean;
  onRemove: (friend: Friend) => void;
  onFavorite: (friend: Friend) => void;
};

export const FriendsTable: React.FC<FriendsTableProps> = ({
  friends,
  canSendGifts,
  onRemove,
  onFavorite,
}) => {
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
                    <Favorite color="love" fontSize="small" />
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
              align="left"
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
              align="left"
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
            {/* Gift Sent */}
            <TableCell align="center" width={50}></TableCell>
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
                    <Favorite color="love" fontSize="small" />
                  ) : (
                    <FavoriteBorderOutlined color="love" fontSize="small" />
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
                align="left"
                sx={{
                  display: isMobile ? 'none' : 'table-cell',
                  fontSize: '0.8rem',
                }}
              >
                {shorthandNumber(friend.gamesPlayed)}
              </TableCell>

              <TableCell
                align="left"
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
                  disableHoverListener={
                    !friend.hasSentGiftToday && canSendGifts
                  }
                >
                  <span>
                    <Button
                      size="small"
                      variant="round"
                      color="love"
                      disabled={!canSendGifts || friend.hasSentGiftToday}
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

const EmptyFriendsPlaceholder = () => (
  <Box
    sx={{
      width: '100%',
      display: 'grid',
      placeItems: 'center',
      flexDirection: 'column',
      border: (theme) => `1px solid ${theme.palette.divider}`,
      padding: 3,
    }}
  >
    <ValentinesGift
      sx={{
        height: 150,
        width: 150,
        py: 2,
      }}
    />
    <Typography variant="h4" color="error">
      Add Friends
    </Typography>
    <Box my={1} mb={2} textAlign="center">
      <Typography variant="body2">
        Share up to <b>{MAX_DAILY_GIFT_BOX_SHARES}</b> gift boxes with your
        friends every day.
      </Typography>
      <Typography variant="body2">
        <Link href="/help/vip">VIP Members</Link> can share 3x gift boxes.
      </Typography>
    </Box>
    <Link href="/help/friends" variant="dangrek" color="error">
      Learn More
    </Link>
  </Box>
);
