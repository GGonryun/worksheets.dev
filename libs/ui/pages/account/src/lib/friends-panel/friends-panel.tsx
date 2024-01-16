import { InfoOutlined } from '@mui/icons-material';
import { Box, Divider, Link, Typography } from '@mui/material';
import { WebHeart } from '@worksheets/icons/web';

import { PanelFooter } from '../panel-footer';
import { PanelHeader } from '../panel-header';
import { Friend } from '../types';
import { SendGiftsSection } from './sections';
import { AddFriendsSection } from './sections/add-friends-section';

export const FriendsPanel: React.FC<{
  friends: Friend[];
  refreshTimestamp: number;
  giftsRemaining: number;
  friendCode: string;
  onRemove: (friend: Friend) => void;
  onFavorite: (friend: Friend) => void;
}> = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <PanelHeader
        primary="Friends"
        secondary={`${props.friends.length} friends`}
        icon={<WebHeart fontSize="large" />}
      />

      <Divider />

      <AddFriendsSection friendCode={props.friendCode} />

      <SendGiftsSection
        friends={props.friends}
        giftsRemaining={props.giftsRemaining}
        refreshTimestamp={props.refreshTimestamp}
        onRemove={props.onRemove}
        onFavorite={props.onFavorite}
      />

      <Divider />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <InfoOutlined color="info" fontSize="small" />
        <Typography>
          Earn tokens when people play games with our{' '}
          <Link href="/account/referrals">Referral Program</Link>.
        </Typography>
      </Box>
      <PanelFooter learn={{ text: 'Friends', href: '/help/friends' }} />
    </Box>
  );
};
