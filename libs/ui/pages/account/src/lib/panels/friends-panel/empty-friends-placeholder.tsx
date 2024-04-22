import { Box, Button, Typography } from '@mui/material';
import { ValentinesGift } from '@worksheets/icons/valentines';
import { routes } from '@worksheets/routes';
import { FriendsPanels } from '@worksheets/util/enums';

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
        Share items with friends to earn more tokens.
      </Typography>
    </Box>
    <Button
      variant="arcade"
      color="error"
      href={routes.account.friends.path({
        bookmark: FriendsPanels.AddFriends,
      })}
    >
      Add Friends
    </Button>
  </Box>
);
