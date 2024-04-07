import { Box, Link, Typography } from '@mui/material';
import { ValentinesGift } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { FriendsPanels } from '@worksheets/util/enums';
import { MAX_DAILY_GIFT_BOX_SHARES } from '@worksheets/util/settings';

export const EmptyFriendsPlaceholder = () => (
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
        <Link href={routes.help.vip.path()}>VIP Members</Link> can share 3x gift
        boxes.
      </Typography>
    </Box>
    <Link
      href={routes.account.friends.path({
        bookmark: FriendsPanels.AddFriends,
      })}
      variant="body1"
      color="error"
    >
      Add Friends
    </Link>
  </Box>
);
