import { InfoOutlined } from '@mui/icons-material';
import { Box, Divider, Link, Typography } from '@mui/material';
import { ValentinesGift } from '@worksheets/icons/valentines';
import { FriendsPanels } from '@worksheets/util/enums';
import { MAX_DAILY_GIFT_BOX_SHARES } from '@worksheets/util/settings';
import React from 'react';

import { useTimeUntil } from '../../__hooks__/use-time-until';
import { BulletPoints } from '../../bullet-points';
import { PanelFooter } from '../../panel-footer';
import { RewardsTimer } from '../../rewards-timer';
import { Friend } from '../../types';
import { GiftsTable } from '../gifts-table';

export const SendGiftsSection: React.FC<{
  giftsRemaining: number;
  friends: Friend[];
  refreshTimestamp: number;
  canSendGifts: boolean;
  onRemove: (friend: Friend) => void;
  onFavorite: (friend: Friend) => void;
  onSendGift: (friend: Friend) => void;
}> = (props) => {
  const timeRemaining = useTimeUntil(props.refreshTimestamp);

  const addFriendsLink = `/account/friends#${FriendsPanels.AddFriends}`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          mb: -1,
          gap: 1,
        }}
      >
        <Typography variant="h6">Share The Love</Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <ValentinesGift />
          <Typography variant="h6">
            {props.giftsRemaining} Gifts Available
          </Typography>
        </Box>
      </Box>

      <GiftsTable
        friends={props.friends}
        canSendGifts={props.canSendGifts}
        onFavorite={props.onFavorite}
        onSendGift={props.onSendGift}
      />

      <RewardsTimer timeRemaining={timeRemaining} />

      <Divider />

      <BulletPoints
        title="How It Works"
        icon={<InfoOutlined color="info" fontSize="small" />}
        points={[
          <>
            Add friends by sharing your{' '}
            <Link href={addFriendsLink}>Friend Code</Link>.
          </>,
          `You can send a gift to ${MAX_DAILY_GIFT_BOX_SHARES} friends per day.`,
          `You earn a gift box for every friend you send a gift to.`,
          <>
            Open gift boxes on the{' '}
            <Link href="/account/tokens">Tokens Page</Link>.
          </>,
          `Your favorite friends are listed at the top of the table.`,
        ]}
      />

      <PanelFooter
        learn={{
          text: 'Sending Gifts',
          href: '/help/tokens-rewards#gift-boxes',
        }}
        action={{ text: 'Add Friends', href: addFriendsLink }}
      />
    </Box>
  );
};